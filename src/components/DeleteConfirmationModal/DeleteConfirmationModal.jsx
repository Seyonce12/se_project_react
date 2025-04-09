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
          <h2 className="delete-modal__title">Are you sure you want to delete this item?</h2>
          <p className="delete-modal__text">This action is irreversible.</p>
          <p 
            className="delete-modal__confirm-text" 
            onClick={onConfirm}
          >
            Yes, delete item
          </p>
          <p 
            className="delete-modal__cancel-text" 
            onClick={onClose}
          >
            Cancel
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirmationModal;