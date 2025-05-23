import './EditProfileModal.css';
import { useContext, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser) {
      const nameInput = document.getElementById('modal__input-name');
      const avatarInput = document.getElementById('modal__input-avatar');
      
      if (nameInput) nameInput.value = currentUser.name || '';
      if (avatarInput) avatarInput.value = currentUser.avatar || '';
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.elements.name.value;
    const avatar = form.elements.avatar.value;
    
    const updateData = {
      name,
      avatar
    };
    
    onUpdateUser(updateData, e);
  };

  return (
    isOpen && (
      <ModalWithForm
        title="Change profile data"
        name="edit-profile"
        buttonText="Save"
        onClose={onClose}
        handleSubmitForm={handleSubmit}
      >
        <label className="modal__input">
          Name *
          <input
            id="modal__input-name"
            className="modal__input-form"
            name="name"
            type="text"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            required
          />
        </label>
        
        <label className="modal__input">
          Avatar URL
          <input
            id="modal__input-avatar"
            className="modal__input-form"
            name="avatar"
            type="url"
            placeholder="Avatar URL"
          />
        </label>
      </ModalWithForm>
    )
  );
};

export default EditProfileModal;