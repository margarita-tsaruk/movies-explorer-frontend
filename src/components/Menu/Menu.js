import './Menu.css';
import { Switch, Route, Link } from 'react-router-dom';

function Menu ( { isMenuOpen, onChangeMenu } ) {
  return (
    <div className={ `${ !isMenuOpen ?  "menu" : "menu menu_visible" }` }>
      <div className="menu__container">
        <button className="menu__button-close" type="button" onClick={ onChangeMenu }></button>
        <Switch>
          <Route path="/">
            <div className="menu__content">
              <nav className="menu__nav">
                <Link className="menu__nav__link menu__nav__link_main" to="/" onClick={ onChangeMenu }>
                  Главная
                </Link>
                <Link className="menu__nav__link menu__nav__link_movies" to="/movies" onClick={ onChangeMenu }>
                  Фильмы
                </Link>
                <Link className="menu__nav__link menu__nav__link_saved-movies" to="/saved-movies" onClick={ onChangeMenu }>
                  Сохранённые фильмы
                </Link>
              </nav> 
              <Link className="menu__nav__profile" to="/profile" onClick={ onChangeMenu }>
                <p className="menu__nav__account">Аккаунт</p>
                <div className="menu__nav__icon"></div>
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Menu;