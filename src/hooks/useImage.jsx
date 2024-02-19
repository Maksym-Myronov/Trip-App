//Images
import snow from '../assets/images/Image.svg';
import cloud from '../assets/images/06_cloudy_color.svg';
import sun from '../assets/images/01_sunny_color.svg';
import rain from '../assets/images/11_heavy_rain_color.svg';
import drizzle from '../assets/images/09_light_rain_color.svg';
import heavyRain from '../assets/images/14_thunderstorm_color (1).svg';
import partlyCloudy from '../assets/images/35_partly_cloudy_daytime_color.svg';
import fog from '../assets/images/15_fog_color.svg';

export const useImage = () => {

    const renderWeatherImage = (weatherCondition, styles) => {
        let imageSource;
        switch (weatherCondition) {
        case 'Thunderstorm':
            imageSource = heavyRain;
            break;
        case 'Drizzle':
            imageSource = drizzle;
            break;
        case 'rain':
            imageSource = rain;
            break;
        case 'snow':
            imageSource = snow;
            break;
        case 'clear-day':
            imageSource = sun;
            break;
        case 'cloudy':
            imageSource = cloud;
            break;
        case 'fog': 
            imageSource = fog;
            break;
        default:
            imageSource = partlyCloudy; 
            break;
        }

        return  <img src={imageSource} alt={weatherCondition} style={styles} />;
    };

    return [renderWeatherImage];
};

