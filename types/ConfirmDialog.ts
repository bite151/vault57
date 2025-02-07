export interface ConfirmDialogProps<Data> {
  title: string
  dialog: string
  buttons: ConfirmDialogButton[]
  data?: Data
}

export interface ConfirmDialogButton {
  text: string;
  action: <T>(params: T) => void
}
