import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface DataAutocomplete {
  id: number
  label: string
}

type AutocompleteProps = TextFieldProps & {
  label?: string
  name: string
  values: DataAutocomplete[]
}

export const Autocomplete = ({ label, name, values }: AutocompleteProps) => {
  const methods = useFormContext()

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field }) => (
        <MUIAutocomplete
          fullWidth
          options={values}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          renderInput={({ ...params }) => (
            <TextField {...params} {...field} label={label} />
          )}
        />
      )}
    />
  )
}
