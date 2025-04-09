import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ onSelectCard, clothingItems, openAddClothesModal }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onSelectCard={onSelectCard}
          clothingItems={clothingItems}
          openAddClothesModal={openAddClothesModal}
        />
      </section>
    </div>
  );
}

export default Profile;