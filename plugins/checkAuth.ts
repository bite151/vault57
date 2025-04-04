import {useAuthStore} from "~/store/authStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  
  nuxtApp.hook('app:created', async () => {
    await authStore.checkAuth()
  });
});
