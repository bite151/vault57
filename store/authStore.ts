export const useAuthStore = defineStore('auth', () => {
  const { apiRequest } = useAPI();
  const isAuth = ref<boolean>(false)
  const profile = ref<any>(null)
  
  async function login(body: { login: string; password: string }) {
    if (isAuth.value) return
    
    profile.value = await apiRequest('/auth/login', 'POST', { body })
    isAuth.value = true
  }
  
  async function checkAuth() {
    try {
      const data = await apiRequest('/users/profile', 'GET')
      isAuth.value = true
      profile.value = data
    } catch (e: any) {
      clearAuth()
    }
  }
  
  async function logout() {
    await apiRequest('/auth/logout', 'POST')
    clearAuth()
  }
  
  function clearAuth() {
    isAuth.value = false
    profile.value = null
  }
  return { isAuth, profile, login, checkAuth, logout, clearAuth }
})
