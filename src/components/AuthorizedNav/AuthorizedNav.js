import { Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './AuthorizedNav.css';

function AuthorizedNav( { isLoggedIn, onChangeMenu } ) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked)
  }

  return (
    <Switch>
     <Route path="/">
        <nav className="nav__container">
          <div className="nav__container__movies">
            <Link className={ isClicked ? "nav__movies" : "nav__movies nav__movies_active" } to="/movies" onClick={handleClick}>
              Фильмы
            </Link>
            <Link className={ !isClicked ? "nav__movies" : "nav__movies nav__movies_active" } to="/saved-movies" onClick={handleClick}>
              Сохранённые фильмы
            </Link>
          </div>
          <Link className="nav__profile" to="/profile">
            <p className="nav__account">Аккаунт</p>
            <div className="nav__icon"></div>
          </Link>
        </nav>
        <button className={ isLoggedIn ? "nav__menu-button" : " " } onClick={ onChangeMenu }></button>
      </Route>
    </Switch>
  );
}

export default AuthorizedNav;
