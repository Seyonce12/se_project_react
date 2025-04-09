import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import AddClothes from '../AddClothes/AddClothes';

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form values
    const form = e.target;
    const name = form.elements.name.value;
    const imageUrl = form.elements.link.value;
    const weather = form.elements.weather.value;
    
    // Create new clothing item
    const newItem = {
      name,
      weather,
      imageUrl
    };
    
    onAddItem(newItem);
  };

  return (
    isOpen && (
      <ModalWithForm
        title="New clothes"
        name="clothes"
        buttonText="Add clothes"
        onClose={onClose}
        handleSubmitForm={handleSubmit}
      >
        <AddClothes />
      </ModalWithForm>
    )
  );
};

export default AddItemModal;