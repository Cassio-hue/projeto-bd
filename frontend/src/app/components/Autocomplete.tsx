import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export interface DataAutocomplete {
  id: number
  label: string
}

type AutocompleteProps = TextFieldProps & {
  label?: string
  name: string
  values: DataAutocomplete[]
  onSelect?: (selectedValue: DataAutocomplete | null) => void
}

export const Autocomplete = ({ label, name, values, onSelect }: AutocompleteProps) => {
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
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            );
          }}
          renderInput={({ ...params }) => (
            <TextField {...params} {...field} label={label} />
          )}
          onChange={(e, selectedOption) => {
            const departmentId = selectedOption ? selectedOption.id : null;
            field.onChange(departmentId);

            if (onSelect && selectedOption) {
              onSelect(selectedOption);
            }
          }}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            if (!values.find((item) => item.label === target.value)) {
              field.onChange(null);
            }
          }}
        />
      )}
    />
  )
}
