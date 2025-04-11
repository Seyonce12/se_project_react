import './ModalWithForm.css';
import Modal from '../Modal/Modal';
import useModalClose from '../../hooks/useModalClose';

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText,
  onClose,
  handleSubmitForm,
  isOpen = true
}) => {
  // Use our custom hook
  useModalClose(isOpen, onClose);

  return (
    <Modal name={name} onClose={onClose}>
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
    </Modal>
  );
};

export default ModalWithForm;