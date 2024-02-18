//Styles
import styles from './index.module.scss'
//Images
import photo from '../../../assets/images/1mc6b12000b8d5wjd42F4_R_550_412_R5_D.webp'

const CitiesCard = () => {
    return (
        <div className={styles.widget}>
            <div className={styles.widget__container}>
                <img src={photo} alt="photo" className={styles.widget__images} />
                <div className={styles.widget__info}>
                    <h1>Berlin</h1>
                    <p>14.07.2023 - 21.07.2023</p>
                </div>
            </div>
            <div className={styles.widget__container}>
                <img src={photo} alt="photo" className={styles.widget__images} />
                <div className={styles.widget__info}>
                    <h1>Berlin</h1>
                    <p>14.07.2023 - 21.07.2023</p>
                </div>
            </div>
            <div className={styles.widget__container}>
                <img src={photo} alt="photo" className={styles.widget__images} />
                <div className={styles.widget__info}>
                    <h1>Berlin</h1>
                    <p>14.07.2023 - 21.07.2023</p>
                </div>
            </div>
            <div className={styles.widget__button}>
                <button className={styles.widget__add}>+ <br />Add Trip</button>
            </div>
        </div>
    )
}

export default CitiesCard