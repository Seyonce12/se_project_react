import './SideBar.css';
import avatar from '../../images/AvatarPicture.png';

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="User avatar" />
      <p className="sidebar__username">Sabrina Florence</p>
    </div>
  );
}

export default SideBar;