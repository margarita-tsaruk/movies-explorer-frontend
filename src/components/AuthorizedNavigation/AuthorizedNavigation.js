import { Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './AuthorizedNavigation.css';

function AuthorizedNavigation(  ) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function showMenu() {
    setIsOpenMenu(!isOpenMenu)
  }

  function handleClick() {
    setIsClicked(!isClicked)
  }

  return (
    <Switch>
     <Route path="/">
        <nav className="nav__container">
          <Link className={isClicked ? "nav__movies" : "nav__movies nav__movies_active"} to="/movies" onClick={handleClick}>
            Фильмы
          </Link>
          <Link className={!isClicked ? "nav__movies" : "nav__movies nav__movies_active"} to="/saved-movies" onClick={handleClick}>
            Сохранённые фильмы
          </Link>
        </nav>
          <Link className="nav__profile" to="/profile">
            <p className="nav__account">Аккаунт</p>
            <div className="nav__icon"></div>
          </Link>
          <button className="nav__menu-button" onClick={showMenu}></button>
     
      </Route>
    </Switch>
  );
}

export default AuthorizedNavigation;