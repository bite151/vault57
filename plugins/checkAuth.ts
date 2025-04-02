import {useAuthStore} from "~/store/authStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  
  nuxtApp.hook('app:created', async () => {
    const session = useCookie<string | null>('session');
    await authStore.checkAuth(session.value)
  });
});
