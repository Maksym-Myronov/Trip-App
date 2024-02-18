import { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const ModalWindow = () => {
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

                console.log(place);
                console.log("Latitude:", lat);
                console.log("Longitude:", lon);
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
        <div>
            <input id="autocomplete" type="text" placeholder="Enter a location" />
            {photoUrl && <img src={photoUrl} alt="Location" />}
        </div>
    )
}

export default ModalWindow
