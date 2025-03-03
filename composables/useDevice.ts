import { onMounted } from 'vue';
import { useEventListener } from "@vueuse/core";

export function useDevice() {
  const isMobile = useState<boolean>('isMobile', () => false);
  
  const checkDevice = (userAgent: string) => {
    isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  };
  
  if (import.meta.server) {
    const headers = useRequestHeaders(['user-agent']);
    checkDevice(headers['user-agent'] || '');
  } else {
    onMounted(() => {
      checkDevice(navigator.userAgent);
      useEventListener('resize', () => checkDevice(navigator.userAgent));
    });
  }
  
  return { isMobile };
}
