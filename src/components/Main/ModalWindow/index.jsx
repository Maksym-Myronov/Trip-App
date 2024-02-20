import { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
//Styles
import styles from './index.module.scss'
import { addImageAndCity, fetchCards } from '../../../store/Cards/cardSlice';
import { useDispatch } from 'react-redux';

const ModalWindow = ({handleOpenModalWindow}) => {
    const [photoUrl, setPhotoUrl] = useState("");
    const [data, setData] = useState(null)
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [value, setValue] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeSecondDate = (e) => {
        setSelectedDate(e.target.value)
    }

    const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;
    const dispatch = useDispatch()

    const startData = value.split("-");
    const reversedDate = `${startData[1]}.${startData[2]}.${startData[0]}`;
    const endData = selectedDate.split("-")
    const reversedEndData = `${endData[1]}.${endData[2]}.${endData[0]}`

    const handleAddCard = () => {
        dispatch(fetchCards({lat: lat, lon: lon}))
        dispatch(addImageAndCity({ image: photoUrl, cityName: data, startDate: reversedDate, endDate: reversedEndData }))
        handleOpenModalWindow()
    }
    
    const initialize = () => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            { types: ["geocode"] }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lon = place.geometry.location.lng();
                const name = place && place.vicinity
                setLat(lat)
                setLon(lon)
                setData(name)
            }

            if (place.photos && place.photos.length > 0) {
                setPhotoUrl(
                    place.photos[0].getUrl({ maxWidth: 350, maxHeight: 350 })
                );
            }
        });
    };

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: "weekly",
            libraries: ["places"],
        });

        loader.load().then(() => {
            initialize();
        });
    }, [API_KEY]);

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 15);

    const formatDate = (date) => {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };

    return (
        <div className={styles.window}>
            <div className={styles.window__container}>
                <div className={styles.window__main}>
                    <div className={styles.window__header}>
                        <h1>Create new trip</h1>
                        <button onClick={() => handleOpenModalWindow()} className={styles.window__close}>x</button>
                    </div>
                    <hr className={styles.window__hr}/>
                    <div>
                        <p className={styles.window__text}><span>*</span> City</p>
                        <input 
                            id="autocomplete" 
                            type="text" 
                            placeholder="Enter a location" 
                            className={styles.window__input} 
                        />
                    </div>
                    <div>
                        <p className={styles.window__text}><span>*</span> Start date</p>
                        <input 
                            id="dateInput"
                            placeholder="Select Date" 
                            type="text" 
                            onFocus={() => { document.getElementById('dateInput').type = 'date'; }}
                            min={formatDate(currentDate)}
                            max={formatDate(futureDate)}
                            value={value}
                            onChange={handleDateChange}
                            className={styles.window__input} 
                        />
                    </div>
                    <div>
                        <p className={styles.window__text}><span>*</span> End date</p>
                        <input 
                            id="date"
                            placeholder="Select Date" 
                            type="text" 
                            onFocus={() => { document.getElementById('date').type = 'date'; }}
                            min={formatDate(currentDate)}
                            max={formatDate(futureDate)}
                            value={selectedDate}
                            onChange={handleChangeSecondDate}
                            className={styles.window__input} 
                        />
                    </div>
                </div>
                <hr className={styles.window__hr}/>
                <div className={styles.window__buttons}>
                    <button className={styles.window__cancel} onClick={() => handleOpenModalWindow()}>Cancel</button>
                    <button className={styles.window__save} onClick={() => handleAddCard()}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
