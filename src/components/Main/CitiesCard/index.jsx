import { useSelector } from 'react-redux';
import { useState } from 'react';
//Styles
import styles from './index.module.scss'
//Images
import photo from '../../../assets/images/1mc6b12000b8d5wjd42F4_R_550_412_R5_D.webp'
import ModalWindow from '../ModalWindow';

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
                <img src="https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATplDJaXMuZwqg1XKnVwu7oEYCizsiJwWpgBlfOrc9Uldri-nbCoUPjFU8gR5lUgIIk64ylS6E6j3d-tJJjC7uw77KtVVZcmZNkE2gcflkdJ3pGC23yDzKU9IYRBaaXbj_sx1MWZhTTQi0YmDGOUk6ycArszakStkYDyI_J79BEl8AQhuLbq&3u350&4u350&5m1&2e1&callback=none&key=AIzaSyCLPkvspLlXA0SiDV63iVm4s2js_FZ7YYA&token=80675" alt="photo" className={styles.widget__images} />
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