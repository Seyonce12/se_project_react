import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
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
      <ModalWithForm
        title="Sign up"
        name="register"
        buttonText="Next"
        onClose={onClose}
        handleSubmitForm={handleSubmit}
      >
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
      </ModalWithForm>
    )
  );
};

export default RegisterModal;