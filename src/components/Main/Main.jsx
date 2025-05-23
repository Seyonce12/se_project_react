import './Main.css';
import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main({ weatherTemp, weatherType, onSelectCard, timeOfDay, clothingItems, onCardLike  }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  // Handle both object and number formats for weatherTemp
  const temperature = typeof weatherTemp === 'object' 
    ? weatherTemp 
    : {
        F: Math.round(weatherTemp),
        C: Math.round((weatherTemp - 32) * 5/9)
      };
  
  const weatherFilter = () => {
    // Always use Fahrenheit for determining clothing type regardless of display unit
    const tempInF = typeof weatherTemp === 'object' ? weatherTemp.F : weatherTemp;
    
    if (tempInF >= 86) {
      return 'hot';
    } else if (tempInF >= 66 && tempInF <= 85) {
      return 'warm';
    } else if (tempInF <= 65) {
      return 'cold';
    }
  };
  
  const weatherTempFilter = weatherFilter();
  const filterCards = clothingItems.filter((item) => {
    return item.weather === weatherTempFilter;
  });
  
  return (
    <main className="main">
      <WeatherCard
        day={timeOfDay}
        type={weatherType}
        weatherTemp={weatherTemp}
      />
      <div className="main__title">
        Today is {temperature[currentTemperatureUnit]}°{currentTemperatureUnit} / You may want to wear:
      </div>
      <section className="clothing">
        {filterCards.map((data) => (
          <ItemCard key={data._id} data={data} onSelectCard={onSelectCard} onCardLike={onCardLike}/>
        ))}
      </section>
    </main>
  );
}

export default Main;