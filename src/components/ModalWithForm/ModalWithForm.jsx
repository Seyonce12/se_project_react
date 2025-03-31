import './ModalWithForm.css';
import exitButton from '../../images/modalexit.svg';

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText,
  onClose,
  handleSubmitForm,
}) => {
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <section className={`modal modal_type_${name}`} onClick={handleModalClick}>
      <div className="modal__container">
        <button
          className="modal__exit"
          type="button"
          onClick={onClose}
        >
          <img src={exitButton} alt="Exit button" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={handleSubmitForm}>
          <fieldset className="modal__fieldset">{children}</fieldset>
          <span className="modal__error" />
          <button
            type="submit"
            className="modal__submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ModalWithForm;