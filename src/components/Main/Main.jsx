import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main({ weatherTemp, weatherType, onSelectCard, timeOfDay, clothingItems }) {
  const weatherFilter = () => {
    if (weatherTemp >= 86) {
      return 'hot';
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return 'warm';
    } else if (weatherTemp <= 65) {
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
        Today is {Math.round(weatherTemp)}°F / You may want to wear:
      </div>
      <section className="clothing">
        {filterCards.map((data) => (
          <ItemCard key={data._id} data={data} onSelectCard={onSelectCard} />
        ))}
      </section>
    </main>
  );
}

export default Main;