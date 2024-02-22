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
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const sliderStyles = {
        width: '1000px',
        marginLeft: "25px",
        paddingLeft: "40px",
    };

    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 7);

    const formattedStartDate = `${tomorrowDate.getDate()}.${tomorrowDate.getMonth() + 1 < 10 ? '0' : ''}${tomorrowDate.getMonth() + 1}.${tomorrowDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()}.${endDate.getMonth() + 1 < 10 ? '0' : ''}${endDate.getMonth() + 1}.${endDate.getFullYear()}`;
    const sortedCards = cards.cards
    ?.map((item) => ({
        ...item,
        startDate: new Date(item.startDate),
    }))
    .sort((a, b) => a.startDate - b.startDate);

    const startDates = sortedCards?.map((item) => {
        const dateObject = item.startDate;

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

        return formattedDate;
    });

    const endTimes = sortedCards?.map((item) => {
        const dateObject = new Date(item.endDate);

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

        return formattedDate;
    });

    return (
        <div className={styles.widget}>
            {sortedCards && sortedCards.length >= 3 ? (
                <Slider {...settings} style={sliderStyles}>
                    <div className={styles.widget__container} style={{ width: "260px" }}>
                        <img src={`https://lh3.googleusercontent.com/places/ANXAkqEY2x1RQlelpu37XnhSQ2liDsMqZB3sbH-6_WEyZuwCo9ceFxIdX8HHAdQc2myRiARP8V8N9Fj80LaFZB97H3AuECPYbMG6gL8=s1600-w1079`} alt="photo" className={styles.widget__images} />
                        <div className={styles.widget__data}>
                            <h1>{cityName}</h1>
                            <p>{formattedStartDate} - {formattedEndDate}</p>
                        </div>
                    </div>
                    {sortedCards.map((item, index) => {
                        const originalCard = cards.cards.find(card => card.cityName === item.cityName);
                        return (
                            originalCard && originalCard.image !== "" && (
                                <div key={originalCard.cityName} className={styles.widget__main} onClick={() => handleCardClick(originalCard)}>
                                    <div>
                                        <img src={originalCard.image} alt="" className={styles.widget__images}  />
                                        <h1 className={styles.widget__city}>{originalCard.cityName}</h1>
                                    </div>
                                    <div className={styles.widget__info}>
                                        <p>{startDates && startDates[index]} - {endTimes && endTimes[index]}</p>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </Slider>
                ) : (
                <div className={styles.widget__maping}>
                    <div className={styles.widget__container} style={{ width: "260px" }}>
                        <img src={`https://lh3.googleusercontent.com/places/ANXAkqEY2x1RQlelpu37XnhSQ2liDsMqZB3sbH-6_WEyZuwCo9ceFxIdX8HHAdQc2myRiARP8V8N9Fj80LaFZB97H3AuECPYbMG6gL8=s1600-w1079`} alt="photo" className={styles.widget__images} />
                        <div className={styles.widget__data}>
                            <h1>{cityName}</h1>
                            <p>{formattedStartDate} - {formattedEndDate}</p>
                        </div>
                    </div>
                    {cards.cards && cards.cards.map((item, index) => (
                        item.image !== "" && (
                            <div key={item.cityName} className={styles.widget__main} onClick={() => handleCardClick(item)}>
                                <div>
                                    <img src={item.image} alt="" className={styles.widget__images}  />
                                    <h1 className={styles.widget__city}>{item.cityName}</h1>
                                </div>
                                <div className={styles.widget__info}>
                                    <p>{startDates && startDates[index]} - {endTime && endTime[index]}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
            <div className={styles.widget__button}>
                <button className={styles.widget__add} onClick={() => handleOpenModalWindow()}>+</button>
                {isActive ? <ModalWindow handleOpenModalWindow={handleOpenModalWindow} /> : null }
            </div>
        </div>
    )
}

export default CitiesCard