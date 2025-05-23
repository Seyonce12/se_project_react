import './ItemModal.css';
import { useContext } from 'react';
import Modal from '../Modal/Modal';
import useModalClose from '../../hooks/useModalClose';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ItemModal = ({ onClose, selectedCard, onDeleteClick, isOpen = true }) => {
  useModalClose(isOpen, onClose);
  const currentUser = useContext(CurrentUserContext);

  const isOwn = selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassName = (
    `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
  );

  return (
    <Modal name="item" onClose={onClose}>
      <div className="item__modal">
        <p className="item__modal-title">{selectedCard.name}</p>
        <img
          className="item__modal-image"
          alt={selectedCard.name}
          src={selectedCard.link || selectedCard.imageUrl}
        />
      </div>
      <p className="item__modal-weather">Weather: {selectedCard.weather}</p>
      <button 
        className={itemDeleteButtonClassName}
        type="button" 
        onClick={() => onDeleteClick(selectedCard)}
      >
        Delete item
      </button>
    </Modal>
  );
};

export default ItemModal;