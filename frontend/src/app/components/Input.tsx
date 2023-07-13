import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'

type InputProps = TextFieldProps & {
  label?: string
  name: string
  type: string
  multiline?: boolean
  rows?: number
}

export const Input = ({ label, name, type, multiline, rows }: InputProps) => {
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
          {...field}
        />
      )}
    />
  )
}
