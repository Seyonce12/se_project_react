import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({ onSelectCard, clothingItems, openAddClothesModal }) {
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
        {clothingItems.map((item) => (
          <ItemCard key={item._id} data={item} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;