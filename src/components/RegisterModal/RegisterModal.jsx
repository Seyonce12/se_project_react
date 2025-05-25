import './RegisterModal.css';
import Modal from '../Modal/Modal';
import useModalClose from '../../hooks/useModalClose';

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  useModalClose(isOpen, onClose);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const name = form.elements.name.value;
    const avatarUrl = form.elements.avatarUrl.value;
    
    const registerData = {
      email,
      password,
      name,
      avatar: avatarUrl
    };
    
    onRegister(registerData, e);
  };

  return (
    isOpen && (
      <Modal name="register" onClose={onClose}>
        <h2 className="modal__title">Sign up</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <fieldset className="modal__fieldset">
            <label className="modal__label">
              Email*
              <input
                className="modal__input"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </label>
            
            <label className="modal__label">
              Password*
              <input
                className="modal__input"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </label>
            
            <label className="modal__label">
              Name
              <input
                className="modal__input"
                name="name"
                type="text"
                placeholder="Name"
                minLength="1"
                maxLength="30"
              />
            </label>
            
            <label className="modal__label">
              Avatar URL
              <input
                className="modal__input"
                name="avatarUrl"
                type="url"
                placeholder="Avatar URL"
              />
            </label>
          </fieldset>
          
          <div className="modal__button-row">
            <button type="submit" className="modal__submit">
              Next
            </button>
            <div className="modal__switch">
              <span>or </span>
              <button 
                type="button" 
                className="modal__switch-button"
                onClick={onSwitchToLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </Modal>
    )
  );
};

export default RegisterModal;