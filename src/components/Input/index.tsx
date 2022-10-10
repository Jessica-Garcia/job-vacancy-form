import { ChangeEvent } from 'react'
import style from './style.module.css'

type InputProps = {
    name: string,
    labelText: string,
    value: string | number | undefined,
    type?: 'text' | 'number',
    change: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
    name,
    labelText,
    value,
    type = 'text',
    change,
}: InputProps) => {
    return (
        <div className={style.container}>
            <label className={style.labelStyle} htmlFor={name}>{labelText}</label>
            <input className={style.inputStyle} name={name} id={name} value={value} type={type} onChange={e => change(e)} />
        </div>
    )
}
