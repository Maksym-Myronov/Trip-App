//Styles
import styles from './index.module.scss'
//Images 
import sun from '../../../assets/images/01_sunny_color.svg'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const Timer = ({renderWeatherImage, currentDayFull}) => {

    const {forecast} = useSelector((state) => state.weather);
    const temp = forecast && forecast.days && forecast.days[0] && Math.floor(forecast.days[0].temp);
    const cityName = forecast && forecast.address;
    const weatherImage = forecast && forecast.days && forecast.days[0] && forecast.days[0].icon;
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [startData, setStartData] = useState(0)
    const card = useSelector((state) => state.card)

    const getTime = () => {
        if (startData && endTime) {
            const time = Date.parse(startData) - Date.now()
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        }
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            getTime();
        }, 1000);
    
        const allEndDates = card && card.cards && card.cards.map((item) => item && item.endDate)
        const allStartDates = card && card.cards && card.cards.map((item) => item && item.startDate)
    
        if (allEndDates && allEndDates[0]) {
            setEndTime(allEndDates[0]);
        }
    
        if (allStartDates && allStartDates[0]) {
            setStartData(allStartDates[0]);
        }
    
        return () => clearInterval(interval);
    
    }, [card, startData, endTime]);

    return (
        <div className={styles.timer}>
            <div className={styles.timer__container}>
                <div className={styles.timer__info}>
                    <h1 className={styles.timer__day}>{currentDayFull}</h1>
                    <div className={styles.timer__city}>
                    {renderWeatherImage(forecast && weatherImage, {
                                width: '50px',
                                height: '50px',
                            })}
                        <p className={styles.timer__temp}>{temp}°</p>
                    </div>
                    <p className={styles.timer__name}>{cityName}</p>
                </div>
                <div className={styles.timer__data}>
                    <div>
                        <h1>{days}</h1>
                        <p>Days</p>
                    </div>
                    <div>
                        <h1>{hours}</h1>
                        <p>Hour</p>
                    </div>
                    <div>
                        <h1>{minutes}</h1>
                        <p>Minutes</p>
                    </div>
                    <div>
                        <h1>{seconds}</h1>
                        <p>Seconds</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer
