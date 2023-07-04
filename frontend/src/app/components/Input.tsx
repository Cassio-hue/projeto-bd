'use client'

import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'

type InputProps = TextFieldProps & {
  label?: string
}

export const Input = ({ label }: InputProps) => {
  return <TextField label={label} sx={{borderColor: '#FFF'}} />
}
