import "./Header.css";
import logo from '../../Logo.svg';
import avatar from '../../images/AvatarPicture.png';

const Header = ({ locationData, openAddClothesModal }) => {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  const location = locationData;

  return (
    <header className="header">
      <section className="header__section header__section-left">
        <img alt="logo" src={logo} className="header__logo" />
        <p>
          {currentDate}, {location}
        </p>
      </section>
      <section className="header__section header__section-right">
        <button
          className="header__add-clothes-button"
          type="button"
          onClick={openAddClothesModal}
        >
          + Add Clothes
        </button>
        <p className="avatar__name">awesome creator</p>
        <img alt="avatar" src={avatar} className="avatar__picture" />
      </section>
    </header>
  );
};

export default Header;