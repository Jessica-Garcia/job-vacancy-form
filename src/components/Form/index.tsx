import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../Input"
import { IVacancyProps } from "../../interfaces/IVacancyProps"
import style from './style.module.css'
import {v4 as uuidv4 } from 'uuid'

type FormProps = {
    selectedVacancy: IVacancyProps,
    setList: (current: any) => void
}

export const Form = ({selectedVacancy, setList}: FormProps) => {
    const [vacancy, setVacancy] = useState<IVacancyProps>({salary: 0} as IVacancyProps)

    useEffect(() => {
        setVacancy(selectedVacancy)
    },[selectedVacancy])
    
    const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVacancy(previousValue => ({...previousValue, [e.target.name]: e.target.value}))
    }
    
    const saveVacancy = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(vacancy.id){
            const localStorageItems: IVacancyProps[] = JSON.parse(localStorage.getItem('vacancyList') || '[]')
            const vacancyList = localStorageItems.map(item  => {
                if(item.id === vacancy.id) {
                    return vacancy
                }
                return item
            })
            localStorage.setItem('vacancyList', JSON.stringify(vacancyList))
            setList(vacancyList)

        } else {
            const newVacancy = {
                ...vacancy,
                id: uuidv4()
            }
            const localStorageItems = localStorage.getItem('vacancyList')
            const vacancyList = localStorageItems ? JSON.parse(localStorageItems) : []
            localStorage.setItem("vacancyList", JSON.stringify([...vacancyList, newVacancy]))
            
            setList((current: any) => [...current, newVacancy])
        }

    }

    return (
        <div className={style.container}>
            <form onSubmit={saveVacancy} className={style.formContainer} id='vacancyForm' autoComplete="off">
                <Input name='title' labelText='Titulo do Cargo' value={vacancy.title} change={handleDataChange}/> 
                
                <Input name='salary' type='number'labelText='Salário' value={vacancy.salary} change={handleDataChange}/>
                
                <Input name='benefits' labelText='Benefícios' value={vacancy.benefits} change={handleDataChange}/>
                
                <Input name='steps' labelText='Etapas' value={vacancy.steps} change={handleDataChange}/>
            
            
                <Input name='skills' labelText='Habilidades' value={vacancy.skills} change={handleDataChange}/>
            
                <Input name='experience' labelText='Experiêcia' value={vacancy.experience} change={handleDataChange}/>
                <div className={style.activities}>
                    <Input name='activities' labelText='Atividades do cargo' value={vacancy.activities} change={handleDataChange}/>
                </div>
            </form>
            <button type="submit" form="vacancyForm">Salvar</button>
        </div>
    )
}
