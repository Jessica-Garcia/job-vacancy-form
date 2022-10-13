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
        <div className={style.container}>
            <form onSubmit={saveVacancy} className={style.formContainer} id='vacancyForm'>
                <fieldset>
                    <Input name='title' labelText='Titulo do Cargo' value={vacancy.title} change={handleDataChange}/>
                    
                    <Input name='salary' type='number'labelText='Salário' value={vacancy.salary} change={handleDataChange}/>
                    
                    
                    <Input name='benefits' labelText='Benefícios' value={vacancy.benefits} change={handleDataChange}/>
                    
                    <Input name='steps' labelText='Etapas' value={vacancy.steps} change={handleDataChange}/>
                </fieldset>
                <fieldset>
                    <Input name='skills' labelText='Habilidades' value={vacancy.skills} change={handleDataChange}/>
                
                    <Input name='experience' labelText='Experiêcia' value={vacancy.experience} change={handleDataChange}/>
                    
                    <Input name='activities' labelText='Atividades do cargo' value={vacancy.activities} change={handleDataChange}/>
                </fieldset>
            </form>
            <button type="submit" form="vacancyForm">Salvar Modelo</button>
        </div>
    )
}
