import './ItemModal.css';
import Modal from '../Modal/Modal';
import useModalClose from '../../hooks/useModalClose';

const ItemModal = ({ onClose, selectedCard, onDeleteClick, isOpen = true }) => {
  useModalClose(isOpen, onClose);

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
        className="item__modal-delete-button" 
        type="button" 
        onClick={() => onDeleteClick(selectedCard)}
      >
        Delete item
      </button>
    </Modal>
  );
};

export default ItemModal;