import Login from './Login'
import Logout from './Logout'
import Profile from './Profile'
// Styles
import styles from './index.module.scss'
// Images
import search from '../../assets/images/icons8-search.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchDataForecast } from '../../store/Forecast/forecastSlice'

const Header = () => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.card);

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        dispatch(fetchDataForecast());
    }, [dispatch]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);

        const filteredCities = cards.cards.filter((city) =>
            city.cityName.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredCities);
        setShowSuggestions(value.trim() !== ''); 
    };

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
            setShowSuggestions(false);
            setSearchTerm("")
        } else {
            console.error("Invalid startDate format or value");
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__search}>
                <h1 className={styles.header__trip}>Trip App</h1>
                <div className={styles.header__search__input}>
                    <input
                        type="text"
                        placeholder='Search your trip'
                        className={styles.header__input}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <img src={search} alt="search" className={styles.header__icon} />
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <div className={styles.header__list}>
                        <ul>
                            {suggestions.map((city) => (
                                <li key={city.cityName} onClick={() => handleCardClick(city)} className={styles.header__city}>
                                    {city.cityName}, <span className={styles.header__date}>{city.startDate} - {city.endDate}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className={styles.header__regist}>
                <div>
                    <Login />
                    <Logout />
                </div>
                <div>
                    <Profile />
                </div>
            </div>
        </div>
    )
}

export default Header;