import './ItemCard.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ItemCard = ({ data, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = data.likes?.some(id => id === currentUser?._id);

  const itemLikeButtonClassName = `clothing-card-like-button ${isLiked ? 'clothing-card-like-button_active' : ''}`;

  const handleLike = () => {
    onCardLike({ id: data._id, isLiked });
  };

  return (
    <article className="clothing__cards-wrapper">
      <div
        className="clothing__card-items"
        id={`clothing__card-items_${data.name}`}
      >
        <div className="clothing-card-header">
          <p className="clothing-card-title">{data.name}</p>
          {currentUser && (
            <button 
              className={itemLikeButtonClassName}
              onClick={handleLike}
              type="button"
            >
              <svg className="clothing-card-like-icon" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          )}
        </div>
        <img
          className="clothing-card-individual"
          id={`clothing-card-individual_${data.name}`}
          alt={data.name}
          src={data.link || data.imageUrl}
          onClick={() => onSelectCard(data)}
        />
      </div>
    </article>
  );
};

export default ItemCard;