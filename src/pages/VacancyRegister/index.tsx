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
        const selected = vacancyList.find(vacancy => vacancy.id === Number(e.target.value));
        setSelectedVacancy(selected || {} as IVacancyProps)
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
                <Form selectedVacancy={selectedVacancy} />
            </main>
        </>
    )
}