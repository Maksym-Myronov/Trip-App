//Styles
import CitiesCard from './CitiesCard'
import Timer from './Timer'
import WeatherWidget from './WeatherWidget'
import styles from './index.module.scss'

const Main = () => {
    return (
        <div className={styles.main}>
            <div>
                <CitiesCard />
                <WeatherWidget />
            </div>
            <div>
                <Timer />
            </div>
        </div>
    )
}

export default Main
