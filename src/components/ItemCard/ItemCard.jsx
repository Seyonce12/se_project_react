import './ItemCard.css';

const ItemCard = ({ data, onSelectCard }) => {
  return (
    <article className="clothing__cards-wrapper">
      <div
        className="clothing__card-items"
        id={`clothing__card-items_${data.name}`}
      >
        <p className="clothing-card-title">{data.name}</p>
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