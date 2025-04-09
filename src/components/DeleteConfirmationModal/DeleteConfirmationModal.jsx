import React from 'react';
import './DeleteConfirmationModal.css';
import exitButton from '../../images/modalexit.svg';

const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <section className="modal delete-modal" onClick={handleModalClick}>
      <div className="modal__container delete-modal__container">
        <button
          className="modal__exit"
          type="button"
          onClick={onClose}
        >
          <img src={exitButton} alt="Close button" />
        </button>
        <div className="delete-modal__content">
          <p className="delete-modal__title">Are you sure you want to delete this item?</p>
          <p className="delete-modal__subtitle">This action is irreversible.</p>
          <div className="delete-modal__buttons">
            <button 
              className="delete-modal__button delete-modal__button-cancel" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="delete-modal__button delete-modal__button-confirm" 
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirmationModal;