export function usePWA() {
  const installPromptEvent = ref<Event | null>(null);
  const isInstalled = ref(false);
  
  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault(); // Отключаем стандартное всплывающее окно
      installPromptEvent.value = event;
    });
    
    window.addEventListener('appinstalled', () => {
      isInstalled.value = true;
    });
  });
  
  const installPWA = async () => {
    if (installPromptEvent.value) {
      (installPromptEvent.value as any).prompt();
      const result = await (installPromptEvent.value as any).userChoice;
      if (result.outcome === 'accepted') {
        console.log('PWA установлено');
      }
      installPromptEvent.value = null;
    }
  };
  
  return { installPWA, isInstalled, installPromptEvent };
}
