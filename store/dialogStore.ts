import type {AlertDialogProps} from "~/types/AlertDialog";
import type {ConfirmDialogProps} from "~/types/ConfirmDialog";

export const useDialogStore = defineStore('dialog', () => {
  const alertDialog = ref<AlertDialogProps | null>(null)
  const confirmDialog = ref<ConfirmDialogProps | null>(null)
  
  function closeAllDialogs() {
    alertDialog.value = null
    confirmDialog.value = null
  }
  
  return { alertDialog, confirmDialog, closeAllDialogs }
})
