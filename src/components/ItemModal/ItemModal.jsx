import './ItemModal.css';
import exitButton from '../../images/modalexit.svg';

const ItemModal = ({ onClose, selectedCard }) => {
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
            src={selectedCard.link}
          />
        </div>
        <p className="item__modal-weather">Weather: {selectedCard.weather}</p>
      </div>
    </section>
  );
};

export default ItemModal;