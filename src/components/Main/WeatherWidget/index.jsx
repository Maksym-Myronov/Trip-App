//Styles
import styles from './index.module.scss'
//Images
import sun from '../../../assets/images/01_sunny_color.svg'

const WeatherWidget = () => {
    return (
        <div className={styles.weather}>
            <h1>Weekly weather forecast</h1>
            <div className={styles.weather__container}>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
                <div className={styles.weather__widget}>
                    <h1>Monday</h1>
                    <img src={sun} alt="sun" />
                    <p>28°/21°</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherWidget
