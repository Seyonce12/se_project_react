import './WeatherCard.css';
import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import daySunny from "../../images/DaySunny.svg";
import dayCloudy from "../../images/DayCloudy.svg";
import dayRain from "../../images/DayRain.svg";
import dayStorm from "../../images/DayStorm.svg";
import daySnow from "../../images/DaySnow.svg";
import dayFog from "../../images/DayFog.svg";
import nightSunny from "../../images/NightSunny.svg";
import nightCloudy from "../../images/NightCloudy.svg";
import nightRain from "../../images/NightRain.svg";
import nightStorm from "../../images/NightStorm.svg";
import nightSnow from "../../images/NightSnow.svg";
import nightFog from "../../images/NightFog.svg";

const WeatherCard = ({ day, type, weatherTemp = 0 }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  // Handle both object and number formats for weatherTemp
  const temperature = typeof weatherTemp === 'object' 
    ? weatherTemp 
    : {
        F: Math.round(weatherTemp),
        C: Math.round((weatherTemp - 32) * 5/9)
      };
  // Create mapping for weather icons
  const weatherImage = () => {
    if (day) {
      switch (type) {
        case 'clear':
          return daySunny;
        case 'clouds':
          return dayCloudy;
        case 'rain':
        case 'drizzle':
          return dayRain;
        case 'thunderstorm':
          return dayStorm;
        case 'snow':
          return daySnow;
        case 'fog':
        case 'mist':
          return dayFog;
        default:
          return daySunny;
      }
    } else {
      switch (type) {
        case 'clear':
          return nightSunny;
        case 'clouds':
          return nightCloudy;
        case 'rain':
        case 'drizzle':
          return nightRain;
        case 'thunderstorm':
          return nightStorm;
        case 'snow':
          return nightSnow;
        case 'fog':
        case 'mist':
          return nightFog;
        default:
          return nightSunny;
      }
    }
  };

  // Dynamic background style for day/night
  const backgroundStyle = day ? 
    { backgroundColor: "#00A3FF" } : 
    { backgroundColor: "#286897" };

  return (
    <section className="weather">
      <div className="weather__temp">{temperature[currentTemperatureUnit]}°{currentTemperatureUnit}</div>
      <img
        className="weather__image"
        alt={type}
        src={weatherImage()}
        style={backgroundStyle}
      />
    </section>
  );
};

export default WeatherCard;