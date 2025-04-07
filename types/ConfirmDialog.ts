export interface ConfirmDialogProps {
  title: string
  dialog: string
  buttons: ConfirmDialogButton[]
}

export interface ConfirmDialogButton {
  text: string;
  action: () => void
}
