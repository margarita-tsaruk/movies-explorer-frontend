import { Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './AuthorizedNavigation.css';

function AuthorizedNavigation(  ) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  
  function showMenu() {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <Switch>
     <Route path="/">
        <nav className="nav__container">
          <Link className="nav__movies" to="/movies">
            Фильмы
          </Link>
          <Link className="nav__saved-movies" to="/saved-movies">
            Сохраненные фильмы
          </Link>
        </nav>
          <Link className="nav__profile" to="/profile">
            Аккаунт
            <div className="nav__icon"></div>
          </Link>
          <button className="nav__menu-button" onClick={showMenu}></button>
     
      </Route>
    </Switch>
  );
}

export default AuthorizedNavigation;