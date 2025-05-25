import './EditProfileModal.css';
import { useContext, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || '',
        avatar: currentUser.avatar || ''
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updateData = {
      name: values.name,
      avatar: values.avatar
    };
    
    onUpdateUser(updateData, e);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

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
            className="modal__input-form"
            name="name"
            type="text"
            placeholder="Name"
            value={values.name || ''}
            onChange={handleChange}
            minLength="1"
            maxLength="30"
            required
          />
          <span className="modal__error">{errors.name}</span>
        </label>
        
        <label className="modal__input">
          Avatar URL
          <input
            className="modal__input-form"
            name="avatar"
            type="url"
            placeholder="Avatar URL"
            value={values.avatar || ''}
            onChange={handleChange}
          />
          <span className="modal__error">{errors.avatar}</span>
        </label>
      </ModalWithForm>
    )
  );
};

export default EditProfileModal;