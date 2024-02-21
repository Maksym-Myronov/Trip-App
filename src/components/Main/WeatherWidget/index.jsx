import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../../store/Weather/weatherSlice';
import Slider from 'react-slick';
//Styles
import styles from './index.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WeatherWidget = ({ currentDay, renderWeatherImage }) => {
    const forecast = useSelector((state) => state.weather);
    const daysForecast = forecast?.forecast?.days;
    const forecastInLocalCity = useSelector((state) => state.forecast)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchWeather());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };

    const sliderStyles = {
        width: '700px',
    };

    return (
        <div className={styles.weather}>
            <h1>Weekly weather forecast</h1>
            <div className={styles.weather__container}>
                <Slider {...settings} style={sliderStyles}>
                    {forecastInLocalCity.error !== undefined ? (
                        forecastInLocalCity.forecast && forecastInLocalCity.forecast.days && forecastInLocalCity.forecast.days.map((item, index) => (
                            <div key={index} className={styles.weather__widget}>
                                <p>{currentDay[index % 7]}</p>
                                {renderWeatherImage(item?.icon, {
                                    width: '50px',
                                    height: '50px',
                                    display: 'block',
                                    margin: '0 auto',
                                })}
                                <p>
                                    {Math.floor((item?.tempmax - 32) * 5/9)} / {Math.floor((item?.temp - 32) * 5/9)}
                                </p>
                            </div>
                        ))
                    ) : (
                        daysForecast && daysForecast.map((item, index) => (
                            <div key={index} className={styles.weather__widget}>
                                <p>{currentDay[index % 7]}</p>
                                {renderWeatherImage(item?.icon, {
                                    width: '50px',
                                    height: '50px',
                                    display: 'block',
                                    margin: '0 auto',
                                })}
                                <p>
                                    {Math.floor(item?.tempmax)} / {Math.floor(item?.temp)}
                                </p>
                            </div>
                        ))
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default WeatherWidget;