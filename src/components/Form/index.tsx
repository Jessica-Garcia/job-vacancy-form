import React, { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../Input"
import { IVacancyProps } from "../../interfaces/IVacancyProps"
import style from './style.module.css'
import {v4 as uuidv4 } from 'uuid'
import {FilePdf} from 'phosphor-react'
import {VacancyPDF} from '../../documents/vacancy/VacancyPDF'

type FormProps = {
    selectedVacancy: IVacancyProps,
    setList: (current: React.SetStateAction<IVacancyProps[]> | IVacancyProps[]) => void,
    setSelectedVacancy: (current: React.SetStateAction<IVacancyProps> | IVacancyProps) => void
}

export const Form = ({selectedVacancy, setList, setSelectedVacancy}: FormProps) => {
    const [vagaDoForm, setVacancy] = useState<IVacancyProps>({} as IVacancyProps)

    /*
        renderiza no form a vaga selecionada no select quando eu clico em determinada vaga no select
    */
    useEffect(() => {
        setVacancy(selectedVacancy)
    },[selectedVacancy])
    
    /*
        quando digitar algo no input, adiciona no input, selecionado pelo nome, o valor 
        que está sendo digitado nele, atribuindo todos os valores digitados na vaga com o setVacancy
    */
    const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVacancy(previousValue => ({...previousValue, [e.target.name]: e.target.value}))
    }

    /*
        Quando for enviar os dados do form
        Se a vaga que está no form tem id, ou seja, se já existe no select, 
        cria-se uma nova lista, percorre-se a lista de vagas já existente e se o id da vaga no form, 
        for igual ao id da vaga da lista do select, edita essa vaga 
        na lista, se não for for igual retorna a vaga da lista.

        Se não houver id da vaga digitada no form, cria uma nova vaga com o que foi digitado, adiciona um id,
        Pega a lista do local storage, adiciona essa lista trasnformada em array em uma variável e devolve para o local storage
        os valores dessa dessa lista mais a nova vaga cadastrada
        e adiciona a nova lista ao select com o set list
     */

    const saveVacancy = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(vagaDoForm.id){
            const localStorageItems: IVacancyProps[] = JSON.parse(localStorage.getItem('vacancyList') || '[]')
            const vacancyList = localStorageItems.map(itemNoLocalStorage  => {
                if(itemNoLocalStorage.id === vagaDoForm.id) {
                    return vagaDoForm
                }
                return itemNoLocalStorage
            })
            localStorage.setItem('vacancyList', JSON.stringify(vacancyList))
            setList(vacancyList)

        } else {
            const newVacancy = {
                ...vagaDoForm,
                id: uuidv4()
            }

            const localStorageItems = localStorage.getItem('vacancyList')
            const vacancyList = localStorageItems ? JSON.parse(localStorageItems) : []
            localStorage.setItem("vacancyList", JSON.stringify([...vacancyList, newVacancy]))
            
            setList((current: IVacancyProps[]) => [...current, newVacancy])
        }
        setSelectedVacancy({
            title: '', 
            salary: 0,
            activities: '',
            benefits: '',
            steps: '',
            skills: '',
            experience: ''
        } as IVacancyProps)
    }

    return (
        <div className={style.container}>
            <form onSubmit={saveVacancy} className={style.formContainer} id='vacancyForm' autoComplete="off">
                <Input name='title' labelText='Titulo do Cargo *' value={vagaDoForm.title} change={handleDataChange} required={true} autofocus/> 
                
                <Input name='salary' type='number'labelText='Salário *' value={vagaDoForm.salary} change={handleDataChange} required={true}/>
                
                <Input name='benefits' labelText='Benefícios' value={vagaDoForm.benefits} change={handleDataChange}/>
                
                <Input name='steps' labelText='Etapas' value={vagaDoForm.steps} change={handleDataChange}/>
            
                <Input name='skills' labelText='Habilidades' value={vagaDoForm.skills} change={handleDataChange}/>
            
                <Input name='experience' labelText='Experiêcia' value={vagaDoForm.experience} change={handleDataChange}/>
                <div className={style.activities}>
                    <Input 
                        name='activities' 
                        labelText='Atividades do cargo' 
                        value={vagaDoForm.activities} 
                        change={handleDataChange}
                    />
                </div>
                <div className={style.buttons}>
                    <button type="button" onClick={(e)=> VacancyPDF(vagaDoForm)}>
                        <FilePdf weight="bold" size={18}/>
                        Gerar PDF
                    </button>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}
