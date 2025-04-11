import { useEffect } from "react";
import exitButton from "../../images/modalexit.svg";
import "./Modal.css";

export const Modal = ({ name, onClose, children }) => {
  // Add useEffect for the Escape key listener
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    
    // Clean up function to remove event listener
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  // Handler for overlay clicks
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__container">
        <button
          className="modal__exit"
          type="button"
          onClick={onClose}
        >
          <img src={exitButton} alt="Exit button" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;