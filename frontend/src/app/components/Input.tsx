'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'

type InputProps = TextFieldProps & {
  label?: string
  name: string
  type: string
}

export const Input = ({ label, name, type }: InputProps) => {
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
          {...field}
        />
      )}
    />
  )
}
