import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddClothes from '../AddClothes/AddClothes';
import AddItemModal from '../AddItemModal/AddItemModal';
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

  const handleSubmit = (item, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    // Add item to the server and update state
    // Only close modal after successful response
    addItem(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        // Close modal only after successful response
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
        // Don't close modal on error so user can try again
        // Only use fallback if it's a network error, not a server error
        if (err.includes('Error: 500')) {
          alert('Server error: Could not add item. Please try again.');
        } else {
          // Fallback for when server is not available (network error)
          const fallbackItem = {
            ...item,
            _id: Date.now().toString()
          };
          setClothingItems([fallbackItem, ...clothingItems]);
          // Close modal only for network errors where we used the fallback
          handleCloseModal();
        }
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
            <AddItemModal 
              isOpen={true}
              onClose={handleCloseModal}
              onAddItem={handleSubmit}
            />
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