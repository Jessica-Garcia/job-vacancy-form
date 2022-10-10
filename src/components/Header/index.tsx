import style from './style.module.css'
import donaMaria from '../../assets/donaMaria.png'
export const Header = () => {
    return (
        <header className={style.headerContainer}>
            <div className={style.headerBackground}>
                <div className={style.border}>
                    <div className={style.logo}>
                        <img src={donaMaria}alt="" />
                    </div>
                </div>
            </div>
        </header>
    )
}