import { ChangeEvent } from 'react'
import style from './style.module.css'

type InputProps = {
    name: string,
    labelText: string,
    value: string | number,
    type?: 'text' | 'number',
    min?: number,
    required?: boolean,
    form?: string
    change: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
    name,
    labelText,
    value,
    type = 'text',
    min = 0,
    required = false,
    form,
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
                onChange={e => change(e)}
            />
        </div>
    )
}
