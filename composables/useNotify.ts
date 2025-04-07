import {ElNotification} from "element-plus";
type NotifyType = 'success' | 'error' | 'info' | 'warning';

export function useNotify() {
  function notify(type : NotifyType, title : string, message : string) {
    ElNotification[type]({
      title,
      message,
      position: 'bottom-right',
      duration: 1500
    })
  }
  return  { notify }
}
