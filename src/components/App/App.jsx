import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddClothes from '../AddClothes/AddClothes';
import { getWeather } from '../../utils/weatherApi';
import { defaultClothingItems } from '../../utils/constants';

function App() {
  const [modalOpened, setModalOpened] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [location, setLocation] = useState('');
  const [temp, setTemp] = useState(0);
  const [weatherType, setWeatherType] = useState('');
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [clothingItems, setClothingItems] = useState(defaultClothingItems || []);
  const dateNow = Date.now() * 0.001;

  useEffect(() => {
    getWeather()
      .then((data) => {
        const weatherTemperature = data.main.temp;
        setTemp(weatherTemperature);
        const locationName = data.name;
        setLocation(locationName);
        const weatherType = data.weather[0].main;
        setWeatherType(weatherType.toLowerCase());
        const sunriseData = data.sys.sunrise;
        setSunrise(sunriseData);
        const sunsetData = data.sys.sunset;
        setSunset(sunsetData);
      })
      .catch(console.error);
  }, []);

  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };
  
  /* Modal functions */
  const handleCloseModal = () => {
    setModalOpened('');
  };

  useEffect(() => {
    if (!modalOpened) return; // stop the effect not to add the listener if modal is closed
    
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [modalOpened]); // watch modalOpened here

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form values
    const form = e.target;
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    const weather = form.elements.weather.value;
    
    // Create new clothing item
    const newItem = {
      _id: Date.now().toString(), // Simple unique ID
      name,
      weather,
      link
    };
    
    // Add item to the state
    setClothingItems([newItem, ...clothingItems]);
    
    // Close the modal
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setModalOpened('new-clothes-modal');
  };

  /* Item Card Image Modal functions */
  const handleSelectedCard = (card) => {
    setModalOpened('item-modal');
    setSelectedCard(card);
  };
  
  return (
    <div className="App">
      <Header locationData={location} openAddClothesModal={handleOpenModal} />
      <Main
        weatherTemp={temp}
        weatherType={weatherType}
        onSelectCard={handleSelectedCard}
        timeOfDay={timeOfDay()}
        clothingItems={clothingItems}
      />
      <Footer />
      {modalOpened === 'new-clothes-modal' && (
        <ModalWithForm
          title="New clothes"
          name="clothes"
          buttonText="Add clothes"
          onClose={handleCloseModal}
          handleSubmitForm={handleSubmit}
        >
          <AddClothes />
        </ModalWithForm>
      )}
      {modalOpened === 'item-modal' && (
        <ItemModal onClose={handleCloseModal} selectedCard={selectedCard} />
      )}
    </div>
  );
}

export default App;