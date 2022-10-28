import { ChangeEvent, useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { IVacancyProps } from '../../interfaces/IVacancyProps';
import style from './style.module.css';

export const VacancyRegister = () => {

    const [vacancyList, setVacancyList] = useState<IVacancyProps[]>([] as IVacancyProps[])
    const [selectedVacancy, setSelectedVacancy] = useState<IVacancyProps>({} as IVacancyProps)

    useEffect(() => {
        const localStorageItems = localStorage.getItem('vacancyList')
        setVacancyList(localStorageItems ? JSON.parse(localStorageItems) : [])

    }, [])

    const handleSelectedChange = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log("value " + e.target.value)
        const selected = vacancyList.find(vacancy => vacancy.id === e.target.value);

        console.log("selected " + selected)
        setSelectedVacancy(selected || {
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
        <>
            <Header/>
            <main className={style.mainContainer}>
                <aside className={style.selectContainer}>
                    <select  name="selectedVacancy" onChange={handleSelectedChange} value={selectedVacancy.id}>
                        <option value="">Selecione um modelo</option>
                        {
                            vacancyList.length && vacancyList.map(vacancy => (
                                <option value={vacancy.id}>{vacancy.title}</option>
                            ))
                        }
                    </select>
                </aside>
                <Form selectedVacancy={selectedVacancy} 
                    setList={() => setVacancyList}
                />
            </main>
        </>
    )
}