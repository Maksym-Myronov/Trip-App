import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ModalWindow from '../ModalWindow';
import { fetchDataForecast } from '../../../store/Forecast/forecastSlice';
//Styles
import styles from './index.module.scss'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//Images

const CitiesCard = () => {

    const forecast = useSelector((state) => state.weather);
    const cityName = forecast && forecast.forecast && forecast.forecast.address
    const [isActive, setIsActive] = useState(false)
    const cards = useSelector((state) => state.card);
    const dispatch = useDispatch()

    const startDate = cards && cards.cards && cards.cards.map((item) => {
        const dateObject = new Date(item.startDate);
        
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        
        const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    
        return formattedDate;
    });

    const endTime = cards && cards.cards && cards.cards.map((item) => {
        const dateObject = new Date(item.endDate);
        
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
        
        return formattedDate;
    });

    const handleOpenModalWindow = () => {
        setIsActive(!isActive)
    }
    const handleCardClick = (item) => {
        console.log("Clicked on card:", item);
        if (item.startDate && typeof item.startDate === 'string') {
            const inputDate = item.startDate;
            const parts = inputDate.split('.');
            const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
            const endTime = item.endDate;
            const partsTwo = endTime.split('.');
            const formattedDateTwo = `${partsTwo[2]}-${partsTwo[0]}-${partsTwo[1]}`;
            const localName = item.cityName
            dispatch(fetchDataForecast({location: localName, data1: formattedDate, data2: formattedDateTwo}))
        } else {
            console.error("Invalid startDate format or value");
        }
    }

    useEffect(() => {
        dispatch(fetchDataForecast())
    }, [dispatch])

    const settings = {
        infinite: cards && cards.cards && cards.cards.length >= 3,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const sliderStyles = {
        width: '1000px',
    };
    
    console.log(settings);
    return (
        <div className={styles.widget}>
            {cards && cards.cards && cards.cards.length >= 3 ? ( // Виводимо слайдер лише якщо є більше одного городу
                <Slider {...settings} style={sliderStyles}>
                    <div className={styles.widget__container} style={{ width: "260px" }}>
                        <img src={`https://lh3.googleusercontent.com/places/ANXAkqEY2x1RQlelpu37XnhSQ2liDsMqZB3sbH-6_WEyZuwCo9ceFxIdX8HHAdQc2myRiARP8V8N9Fj80LaFZB97H3AuECPYbMG6gL8=s1600-w1079`} alt="photo" className={styles.widget__images} />
                        <div className={styles.widget__data}>
                            <h1>{cityName}</h1>
                            <p>14.07.2023 - 21.07.2023</p>
                        </div>
                    </div>
                    <div >
                        {cards && 
                            <div className={styles.widget__maping}>
                                {cards && cards.cards && cards.cards.map((item, index) => (
                                    item.image !== "" && (
                                        <div key={item} className={styles.widget__main} onClick={() => handleCardClick(item)}>
                                            <div>
                                                <img src={item.image} alt="" className={styles.widget__images}  />
                                                <h1 className={styles.widget__city}>{item.cityName}</h1>
                                            </div>
                                            <div className={styles.widget__info}>
                                                <p>{startDate && startDate[index]} - {endTime && endTime[index]}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        }
                    </div>
                </Slider>
            ) : (
                <div className={styles.widget__container} style={{ width: "260px" }}>
                    <img src={`https://lh3.googleusercontent.com/places/ANXAkqEY2x1RQlelpu37XnhSQ2liDsMqZB3sbH-6_WEyZuwCo9ceFxIdX8HHAdQc2myRiARP8V8N9Fj80LaFZB97H3AuECPYbMG6gL8=s1600-w1079`} alt="photo" className={styles.widget__images} />
                    <div className={styles.widget__data}>
                        <h1>{cityName}</h1>
                        <p>14.07.2023 - 21.07.2023</p>
                    </div>
                </div>
            )}
            <div className={styles.widget__button}>
                <button className={styles.widget__add} onClick={() => handleOpenModalWindow()}>+ <br />Add Trip</button>
                {isActive ? <ModalWindow handleOpenModalWindow={handleOpenModalWindow} /> : null }
            </div>
        </div>
    )
}

export default CitiesCard