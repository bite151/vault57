import {ElNotification} from "element-plus";
type NotifyType = 'success' | 'error' | 'info' | 'warning';

export function useNotify() {
  function notify(type : NotifyType, title : string, message : string, duration : number = 1500) {
    ElNotification[type]({
      title,
      message,
      position: 'bottom-right',
      duration
    })
  }
  
  function notifyArray(type: NotifyType, title: string, errorData: any, delayMs = 1000) {
    const messages = errorData?.message || [];
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex >= messages.length) {
        clearInterval(intervalId);
        return;
      }
      
      notify(type, title, messages[currentIndex], 3000);
      currentIndex++;
    }, delayMs);
    
    return () => clearInterval(intervalId);
  }
  
  return  { notify, notifyArray }
}
