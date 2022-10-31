import { Switch, Route, Link } from 'react-router-dom';
import './NavTab.css';

function NavTab( ) {

  return (
    <Switch>
      <Route path="/">
        <nav className="nav__auth">
          <Link className="nav__auth__register" to="/signup">
            Регистрация
          </Link>
          <Link className="nav__auth__login" to="/signin">
            Войти
          </Link>
        </nav>
      </Route>
    </Switch>
  );
}

export default NavTab;