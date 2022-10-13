import './Navigation.css';

function Navigation() {
  return (
    <div className="nav">
      <button type="button" className="header__register-button">Регистрация</button>
      <button type="button" className="header__login-button">Войти</button>
    </div>
  );
}

export default Navigation;