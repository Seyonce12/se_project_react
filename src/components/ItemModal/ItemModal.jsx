import './ItemModal.css';
import exitButton from '../../images/modalexit.svg';

const ItemModal = ({ onClose, selectedCard, onDeleteClick }) => {
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <section className="modal item__modal" onClick={handleModalClick}>
      <div className="modal__container item__modal-container">
        <button
          className="modal__exit"
          type="button"
          onClick={onClose}
        >
          <img src={exitButton} alt="Close button" />
        </button>
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
      </div>
    </section>
  );
};

export default ItemModal;