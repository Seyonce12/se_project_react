import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ onSelectCard, clothingItems, openAddClothesModal, onEditProfile, onLogout }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
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