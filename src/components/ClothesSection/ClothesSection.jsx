import './ClothesSection.css';
import { useContext } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ClothesSection({ onSelectCard, clothingItems, openAddClothesModal, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(item => item.owner === currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button 
          className="clothes-section__add-btn" 
          onClick={openAddClothesModal} 
          type="button"
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard key={item._id} data={item} onSelectCard={onSelectCard} onCardLike={onCardLike}/>
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;