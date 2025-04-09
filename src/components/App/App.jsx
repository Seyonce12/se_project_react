import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddClothes from '../AddClothes/AddClothes';
import Profile from '../Profile/Profile';
import { getWeather } from '../../utils/weatherApi';
import { defaultClothingItems } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { getItems, addItem, deleteItem } from '../../utils/api';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

function App() {
  const [modalOpened, setModalOpened] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [location, setLocation] = useState('');
  const [temp, setTemp] = useState(0);
  const [weatherType, setWeatherType] = useState('');
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Toggle temperature unit handler
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };
  const dateNow = Date.now() * 0.001;

  // Fetch weather data
  useEffect(() => {
    getWeather()
      .then((data) => {
        // Create a weather object with temperature in both F and C
        const weatherData = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round((data.main.temp - 32) * 5/9)
          }
        };
        
        setTemp(weatherData.temperature);
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
  
  // Fetch clothing items from the server
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error(err);
        // Fallback to default items if server is not available
        setClothingItems(defaultClothingItems);
      });
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
    const imageUrl = form.elements.link.value;
    const weather = form.elements.weather.value;
    
    // Create new clothing item
    const newItem = {
      name,
      weather,
      imageUrl
    };
    
    // Add item to the server and update state
    addItem(newItem)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
        // Fallback for when server is not available
        const fallbackItem = {
          ...newItem,
          _id: Date.now().toString()
        };
        setClothingItems([fallbackItem, ...clothingItems]);
        handleCloseModal();
      });
  };

  const handleOpenModal = () => {
    setModalOpened('new-clothes-modal');
  };

  /* Item Card Image Modal functions */
  const handleSelectedCard = (card) => {
    setModalOpened('item-modal');
    setSelectedCard(card);
  };
  
  /* Delete item functions */
  const handleDeleteClick = (card) => {
    setItemToDelete(card);
    setModalOpened('delete-confirmation-modal');
  };
  
  const handleCardDelete = () => {
    if (!itemToDelete) return;
    
    deleteItem(itemToDelete._id)
      .then(() => {
        // Remove item from state
        setClothingItems(clothingItems.filter(item => item._id !== itemToDelete._id));
        // Close modals and reset state
        handleCloseModal();
        setItemToDelete(null);
      })
      .catch((err) => {
        console.error(err);
        // Fallback for when server is not available
        setClothingItems(clothingItems.filter(item => item._id !== itemToDelete._id));
        handleCloseModal();
        setItemToDelete(null);
      });
  };
  
  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header locationData={location} openAddClothesModal={handleOpenModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherTemp={temp}
                  weatherType={weatherType}
                  onSelectCard={handleSelectedCard}
                  timeOfDay={timeOfDay()}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  openAddClothesModal={handleOpenModal}
                />
              }
            />
          </Routes>
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
            <ItemModal 
              onClose={handleCloseModal} 
              selectedCard={selectedCard} 
              onDeleteClick={() => handleDeleteClick(selectedCard)}
            />
          )}
          
          {modalOpened === 'delete-confirmation-modal' && (
            <DeleteConfirmationModal 
              onClose={handleCloseModal}
              onConfirm={handleCardDelete}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;