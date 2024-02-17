//Styles
import styles from './index.module.scss'
//Images
import userPhoto from '../../assets/images/user.png'
import search from '../../assets/images/icons8-search.svg'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__search}> 
                <h1 className={styles.header__trip}>Trip App</h1>
                <div className={styles.header__search__input}>
                    <input 
                        type="text" 
                        placeholder='Search your trip'
                        className={styles.header__input}
                    />
                    <img src={search} alt="search" className={styles.header__icon} />
                </div>
            </div>
            <div className={styles.header__regist}>
                <button className={styles.header__button}>Log on</button>
                <button className={styles.header__button}>Sign in</button>
                <button className={styles.header__user}><img src={userPhoto} alt="userPhoto" /></button>
            </div>
        </div>
    )
}

export default Header
