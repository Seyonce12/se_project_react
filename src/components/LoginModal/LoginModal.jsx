import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    
    const loginData = {
      email,
      password
    };
    
    onLogin(loginData, e);
  };

  return (
    isOpen && (
      <ModalWithForm
        title="Log in"
        name="login"
        buttonText="Log in"
        onClose={onClose}
        handleSubmitForm={handleSubmit}
      >
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </label>
        
        <label className="modal__label">
          Password
          <input
            className="modal__input"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </label>
        
        <div className="modal__switch">
          <span>or </span>
          <button 
            type="button" 
            className="modal__switch-button"
            onClick={onSwitchToRegister}
          >
             Register
          </button>
        </div>
      </ModalWithForm>
    )
  );
};

export default LoginModal;