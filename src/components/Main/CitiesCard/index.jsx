import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalWindow from '../ModalWindow';
//Styles
import styles from './index.module.scss'
//Images
import photo from '../../../assets/images/1mc6b12000b8d5wjd42F4_R_550_412_R5_D.webp'

const CitiesCard = () => {

    const forecast = useSelector((state) => state.weather);
    const cityName = forecast && forecast.forecast && forecast.forecast.address
    const [isActive, setIsActive] = useState(false)

    const handleOpenModalWindow = () => {
        setIsActive(!isActive)
    }

    return (
        <div className={styles.widget}>
            <div className={styles.widget__container}>
                <img src={`https://lh3.googleusercontent.com/places/ANXAkqEY2x1RQlelpu37XnhSQ2liDsMqZB3sbH-6_WEyZuwCo9ceFxIdX8HHAdQc2myRiARP8V8N9Fj80LaFZB97H3AuECPYbMG6gL8=s1600-w1079`} alt="photo" className={styles.widget__images} />
                <div className={styles.widget__info}>
                    <h1>{cityName}</h1>
                    <p>14.07.2023 - 21.07.2023</p>
                </div>
            </div>
            <div className={styles.widget__container}>
                <img src={photo} alt="photo" className={styles.widget__images} />
                <div className={styles.widget__info}>
                    <h1>Paris</h1>
                    <p>14.07.2023 - 21.07.2023</p>
                </div>
            </div>
            <div className={styles.widget__container}>
                <img src={photo} alt="photo" className={styles.widget__images} />
                <div className={styles.widget__info}>
                    <h1>London</h1>
                    <p>14.07.2023 - 21.07.2023</p>
                </div>
            </div>
            <div className={styles.widget__button}>
                <button className={styles.widget__add} onClick={() => handleOpenModalWindow()}>+ <br />Add Trip</button>
                {isActive ? <ModalWindow handleOpenModalWindow={handleOpenModalWindow} /> : null }
            </div>
        </div>
    )
}

export default CitiesCard