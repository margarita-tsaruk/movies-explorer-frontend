import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onToggleMenu }) {
  return (
    <header className={!loggedIn ? 'header' : 'header header_background_change'}>
      <img className="header__logo" src={logo} alt="Лого" />
      <Navigation />
    </header>
  );
}

export default Header;