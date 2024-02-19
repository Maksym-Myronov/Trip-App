import { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
//Styles
import styles from './index.module.scss'

const ModalWindow = ({handleOpenModalWindow}) => {
    const [photoUrl, setPhotoUrl] = useState("");
    const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

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
                            type="date" 
                            placeholder="Select start date" 
                            className={styles.window__input} 
                        />
                    </div>
                    <div>
                        <p className={styles.window__text}><span>*</span> End date</p>
                        <input 
                            type="date" 
                            placeholder="Select end date" 
                            className={styles.window__input} 
                        />
                    </div>
                </div>
                <hr className={styles.window__hr}/>
                <div className={styles.window__buttons}>
                    <button className={styles.window__cancel} onClick={() => handleOpenModalWindow()}>Cancel</button>
                    <button className={styles.window__save}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
