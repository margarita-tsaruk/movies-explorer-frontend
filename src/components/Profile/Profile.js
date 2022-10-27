import { useForm } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Profile.css';

function Profile( ) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useForm({});
  const [isEditedOn, setIsEditedOn] = useState(false);

  function handleEditClick() {
    setIsEditedOn(!isEditedOn);
  }

  return (
    <main className="profile">
      <h3 className="profile__heading">Привет,{ currentUser.name }  !</h3>
      <form  className="profile__form">
        <fieldset className="profile__form__field">
          <label for="name-input" className="profile__label">Имя
            <input
              id="name-input"
              type="text"
              name="name"
              className="profile__input"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
              value={ values.name || '' }
              onChange={ handleChange }
              disabled = { !isEditedOn }
            />
            <span className="profile__error profile__error_top" id="input-name-error">
              { !isValid && errors.name }
            </span>
          </label>
          <label for="email-input" className="profile__label">E-mail
            <input
              id="email-input"
              type="email"
              name="email"
              className="profile__input"
              placeholder="Email"
              required
              value={ values.email || '' }
              onChange={handleChange}
              disabled = { !isEditedOn }
            />
            <span className="profile__error profile__error_bottom" id="input-email-error">
              { !isValid && errors.email }
            </span>
          </label>
        </fieldset>
        </form> 
        { !isEditedOn 
          ? (
            <><button type="submit" className="profile__edit-button" onClick={ handleEditClick }>Редактировать </button><Link className="profile__sign-out-link" to="/"> Выйти из аккаунта</Link></>
          ) : (
            <button type="submit" className="profile__save-button" onClick={ handleEditClick }>Сохранить</button>
          )
        }
    </main>
  );
}

export default Profile;