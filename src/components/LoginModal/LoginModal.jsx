import './LoginModal.css';
import Modal from '../Modal/Modal';
import useModalClose from '../../hooks/useModalClose';

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  useModalClose(isOpen, onClose);

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
      <Modal name="login" onClose={onClose}>
        <h2 className="modal__title">Log in</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <fieldset className="modal__fieldset">
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
          </fieldset>
          
          <div className="modal__button-row">
            <button type="submit" className="modal__submit">
              Log in
            </button>
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
          </div>
        </form>
      </Modal>
    )
  );
};

export default LoginModal;