type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
interface Options {
  method: Method;
  headers?: { Cookie: string};
}

export const useAuthStore = defineStore('auth', () => {
  const { fetch } = useAPI()
  
  const isAuth = ref<boolean>(false)
  const profile = ref<any>(null)
  
  async function login(body: { login: string; password: string }) {
    if (isAuth.value) return
    
    profile.value = await fetch('/auth/login', 'POST', {
      body,
    })
    isAuth.value = true
  }
  
  async function checkAuth(session: string | null = null) {
    const options: Options = { method: 'GET' }
    
    if (session) {
      options.headers = {
        Cookie: `session=${session}`
      }
    }
    
    try {
      const data = await $fetch<any>('/api/auth/check', options)
      isAuth.value = true
      profile.value = data
    } catch (e) {
      clearAuth()
    }
  }
  
  async function logout() {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    clearAuth()
  }
  
  function clearAuth() {
    isAuth.value = false
    profile.value = null
  }
  return { isAuth, profile, login, checkAuth, logout, clearAuth }
})
