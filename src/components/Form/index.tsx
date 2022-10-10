import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Input } from "../Input"
import { IVacancyProps } from "../../interfaces/IVacancyProps"
import style from './style.module.css'

type FormProps = {
    selectedVacancy: IVacancyProps,
}

export const Form = ({selectedVacancy}: FormProps) => {
    
    const [vacancy, setVacancy] = useState<IVacancyProps>({} as IVacancyProps)
    
    useEffect(() => {
        setVacancy(selectedVacancy)
    },[selectedVacancy])
    const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {

        setVacancy(previousValue => ({...previousValue, [e.target.name]: e.target.value}))
    }
    
    const saveVacancy = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(vacancy.id){
            
        } else {

        }

    }

    return (
        <>
            <form onSubmit={saveVacancy} className={style.container}>
                <Input name='title' labelText='Titulo do Cargo' value={vacancy.title} change={handleDataChange}/>
                
                <Input name='salary' type='number'labelText='Salário' value={vacancy.salary} change={handleDataChange}/>
                
                <Input name='activities' labelText='Atividades que o cargo exerce' value={vacancy.activities} change={handleDataChange}/>
                
                <Input name='benefits' labelText='Benefícios' value={vacancy.benefits} change={handleDataChange}/>
                
                <Input name='steps' labelText='Etapas' value={vacancy.steps} change={handleDataChange}/>

                <Input name='skills' labelText='Habilidades' value={vacancy.skills} change={handleDataChange}/>
                
                <Input name='experience' labelText='Experiêcia' value={vacancy.experience} change={handleDataChange}/>
                <button type="submit">Salvar Modelo</button>
            </form>
        </>
    )
}
