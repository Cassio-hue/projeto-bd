import { Dialog } from '@mui/material'

export type Props = {
  children: JSX.Element | JSX.Element[]
  open: boolean
  className?: string
  handleClose: () => void
}

export const Modal = ({ children, open, handleClose }: Props) => {
  return (
    <Dialog
      hideBackdrop
      fullWidth
      className="bg-cinza-transparente"
      open={open}
      onClose={handleClose}
    >
      <div className="p-6 w-full h-full bg-[#D6D6D6]">{children}</div>
    </Dialog>
  )
}
