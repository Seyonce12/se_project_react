// Make sure your Header component is using the context properly

import "./Header.css";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../../Logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Header = ({ locationData, openAddClothesModal, isLoggedIn, onLoginClick, onRegisterClick }) => {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  const location = locationData;
  const contextUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <section className="header__section header__section-left">
        <Link to="/">
          <img alt="logo" src={logo} className="header__logo" />
        </Link>
        <p>
          {currentDate}, {location}
        </p>
      </section>
      <section className="header__section header__section-right">
        <ToggleSwitch />
        
        {isLoggedIn && contextUser ? (
          <>
            <button
              className="header__add-clothes-button"
              type="button"
              onClick={openAddClothesModal}
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <p className="avatar__name">{contextUser.name}</p>
              {contextUser.avatar ? (
                <img 
                  alt="avatar" 
                  src={contextUser.avatar} 
                  className="avatar__picture" 
                />
              ) : (
                <div className="avatar__placeholder">
                  {contextUser.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              className="header__register-button"
              type="button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__login-button"
              type="button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;