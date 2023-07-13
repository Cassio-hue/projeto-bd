import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'

type InputProps = TextFieldProps & {
  label?: string
  name: string
  type: string
  multiline?: boolean
  rows?: number
  disabled?: boolean
}

export const Input = ({ label, name, type, multiline, rows, disabled }: InputProps) => {
  const methods = useFormContext()

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field }) => (
        <TextField
          fullWidth
          label={label}
          type={type}
          multiline={multiline ? true : false} 
          rows={multiline ? rows : undefined}
          disabled={disabled ? true : false}
          {...field}
        />
      )}
    />
  )
}
