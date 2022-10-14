import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn, onSignedUp }) {


  return (
    <header className={!isLoggedIn ? 'header' : 'header header_background_change'}>
      <img className="header__logo" src={logo} alt="Лого" />
      <Navigation isLoggedIn={isLoggedIn} onSignedUp={onSignedUp} />
    </header>
  );
}

export default Header;