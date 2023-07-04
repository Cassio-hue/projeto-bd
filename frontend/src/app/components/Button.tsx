import { ButtonProps as MUIButtonProps } from '@mui/material'
import { Button as MUIButton} from '@mui/material'
import clsx from 'clsx'

export const Button = ({
    children,
    onClick,
    disabled,
    type,
}: MUIButtonProps) => {
    return (
        <MUIButton
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                'rounded-lg p-3 shadow-lg shadow-slate-600 mt-3 w-full'
            )}
            style={{
                backgroundColor: '#004080',
                color: '#FFF',
                textTransform: 'none',
            }}
        >
            {children}
        </MUIButton>
    )
}