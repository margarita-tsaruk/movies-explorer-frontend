import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header( { isLoggedIn, onSignedUp, onChangeMenu } ) {
  const { pathname } = useLocation();

  return (
    <header className={ !isLoggedIn ? "header" : pathname === "/" ? "header" : "header header_background_change" }>
      <Link to="/">
        <img className="header__logo" src={ logo } alt="Лого" />
      </Link>
      <Navigation isLoggedIn={ isLoggedIn } onSignedUp={ onSignedUp } onChangeMenu={ onChangeMenu }/>
    </header>
  );
}

export default Header;
