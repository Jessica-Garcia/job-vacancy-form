import { ChangeEvent } from 'react'
import style from './style.module.css'

type InputProps = {
    name: string,
    labelText: string,
    value: string | number,
    type?: 'text' | 'number',
    min?: number,
    required?: boolean,
    autofocus?: boolean,
    change: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
    name,
    labelText,
    value,
    type = 'text',
    min = 0,
    required = false,
    autofocus = false,
    change,
}: InputProps) => {
    return (
        <div className={style.container}>
            <label className={style.labelStyle} htmlFor={name}>{labelText}</label>
            <input 
                className={style.inputStyle} 
                name={name || ''}
                value={value || ''} 
                id={name} 
                type={type} 
                min={min}
                required={required}
                autoFocus={autofocus}
                onChange={e => change(e)}
            />
        </div>
    )
}
