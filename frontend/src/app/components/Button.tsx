import { ButtonProps as MUIButtonProps } from '@mui/material'
import { Button as MUIButton } from '@mui/material'
import clsx from 'clsx'
import { CSSProperties } from 'react'

const styleType = {
  CREATE: {
    backgroundColor: '#16a34a',
    color: 'black',
  },
  UPDATE: {
    backgroundColor: '#fbbf24',
    color: 'black',
  },
  DELETE: {
    backgroundColor: '#b91c1c',
    color: 'white',
  },
  LIST: {
    backgroundColor: '#004080',
    color: 'white',
  },
}
interface ButtonProps extends Omit<MUIButtonProps, 'style'> {
  style?: 'CREATE' | 'UPDATE' | 'DELETE' | 'LIST'
}

export const Button = ({
  style,
  children,
  onClick,
  disabled,
  type,
}: ButtonProps) => {
  const buttonStyle =
    style && styleType[style]
      ? styleType[style]
      : ({
          backgroundColor: '#004080',
          color: '#FFF',
        } as CSSProperties)

  return (
    <MUIButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx('rounded-lg p-3 shadow-lg shadow-slate-600 mt-3 w-full')}
      style={{ ...buttonStyle, textTransform: 'none' }}
    >
      {children}
    </MUIButton>
  )
}
