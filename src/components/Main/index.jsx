//Styles
import { useGetData } from '../../hooks/useGetData'
import { useImage } from '../../hooks/useImage'
import CitiesCard from './CitiesCard'
import Timer from './Timer'
import WeatherWidget from './WeatherWidget'
import styles from './index.module.scss'

const Main = () => {

    const [currentDay, currentDayFull] = useGetData()
    const [renderWeatherImage] = useImage()

    return (
        <div className={styles.main}>
            <div>
                <CitiesCard />
                <WeatherWidget 
                    currentDay={currentDay}
                    renderWeatherImage={renderWeatherImage}
                />
            </div>
            <div>
                <Timer renderWeatherImage={renderWeatherImage} currentDayFull={currentDayFull}/>
            </div>
        </div>
    )
}

export default Main
