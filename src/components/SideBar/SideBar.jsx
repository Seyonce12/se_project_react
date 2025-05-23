import './SideBar.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img className="sidebar__avatar" src={currentUser.avatar} alt="User avatar" />
      ) : (
        <div className="sidebar__avatar-placeholder">
          {currentUser?.name?.charAt(0)?.toUpperCase()}
        </div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>
      <button 
        className="sidebar__edit-button" 
        onClick={onEditProfile} 
        type="button"
      >
        Edit profile
      </button>
      <button 
        className="sidebar__logout-button" 
        onClick={onLogout} 
        type="button"
      >
        Sign out
      </button>
    </div>
  );
}

export default SideBar;