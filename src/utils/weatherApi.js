import { latitude, longitude, APIkey } from './constants';
import { checkResponse } from './api';

export const getWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
  return weatherApi;
};

// Process weather data to include both temperature units
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;

  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };

  result.type = getWeatherType(result.temp.F);

  return result;
};

// Determine weather type based on temperature
const getWeatherType = (tempF) => {
  if (tempF >= 86) {
    return "hot";
  } else if (tempF >= 66 && tempF <= 85) {
    return "warm";
  } else {
    return "cold";
  }
};