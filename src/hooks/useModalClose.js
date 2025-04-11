import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open
    
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    const handleOverlay = (e) => {
      // Check if the clicked element has the 'modal' class name
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);
    
    // Clean up function to remove event listeners
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]); // Watch isOpen to add listeners only when modal is open
}

export default useModalClose;