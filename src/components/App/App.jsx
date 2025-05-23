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
import { signup, signin, getCurrentUser } from '../../utils/auth';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { updateUser } from '../../utils/auth';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { likeItem, unlikeItem } from '../../utils/api';


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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Toggle temperature unit handler
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };
  const dateNow = Date.now() * 0.001;

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Token validation failed:', err);
          localStorage.removeItem('jwt');
        });
    }
  }, []);

  // Fetch weather data
  useEffect(() => {
    getWeather()
      .then((data) => {
        // Create a weather object with temperature in both F and C
        const weatherData = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round((data.main.temp - 32) * 5 / 9)
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
        if (err.includes('Error: 500')) {
          alert('Server error: Could not add item. Please try again.');
        }
      });
  };

  const handleOpenModal = () => {
    setModalOpened('new-clothes-modal');
  };

  const handleLoginModal = () => {
    setModalOpened('login-modal');
  };

  const handleRegisterModal = () => {
    setModalOpened('register-modal');
  };

  const switchToRegister = () => {
    setModalOpened('register-modal');
  };

  const switchToLogin = () => {
    setModalOpened('login-modal');
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
      .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setModalOpened('edit-profile-modal');
  };

const handleRegister = (registerData, e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  signup(registerData)
    .then((user) => {
      return signin({ email: user.email, password: registerData.password });
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        return getCurrentUser();
      }
    })
    .then((user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      handleCloseModal();
      if (e && e.target) {
        e.target.reset();
      }
    })
    .catch((err) => {
      console.error('Registration failed:', err);
    });
};

  const handleLogin = (loginData, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    signin(loginData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          return getCurrentUser();
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
        if (e && e.target) {
          e.target.reset();
        }
      })
      .catch((err) => {
        console.error('Login failed:', err);
        localStorage.removeItem('jwt');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleUpdateUser = (updateData, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    updateUser(updateData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
        if (e && e.target) {
          e.target.reset();
        }
      })
      .catch((err) => {
        console.error('Profile update failed:', err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ?
      likeItem(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err))
      :
      unlikeItem(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header locationData={location} openAddClothesModal={handleOpenModal} isLoggedIn={isLoggedIn} onLoginClick={handleLoginModal} onRegisterClick={handleRegisterModal}/>
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
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onSelectCard={handleSelectedCard}
                    clothingItems={clothingItems}
                    openAddClothesModal={handleOpenModal}
                    onEditProfile={handleEditProfileModal}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />

          {modalOpened === 'login-modal' && (
            <LoginModal
              isOpen={true}
              onClose={handleCloseModal}
              onLogin={handleLogin}
              onSwitchToRegister={switchToRegister}
            />
          )}

          {modalOpened === 'register-modal' && (
            <RegisterModal
              isOpen={true}
              onClose={handleCloseModal}
              onRegister={handleRegister}
              onSwitchToLogin={switchToLogin}
            />
          )}

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

          {modalOpened === 'edit-profile-modal' && (
            <EditProfileModal
              isOpen={true}
              onClose={handleCloseModal}
              onUpdateUser={handleUpdateUser}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;