import { Switch, Route, Link } from 'react-router-dom';
import './LandingNavigation.css';

function LandingNavigation({ onSignedUp }) {

  return (
    <Switch>
      <Route path="/">
        <nav className="nav__auth">
          <Link className="nav__auth_register" to="/signup" onClick={onSignedUp}>
            Регистрация
          </Link>
          <Link className="nav__auth_login" to="/signin">
            Войти
          </Link>
        </nav>
      </Route>
    </Switch>
  );
}

export default LandingNavigation;