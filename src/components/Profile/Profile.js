import { useForm } from '../../hooks/useForm';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Profile.css';
import { regularExpressionEmail } from '../../utils/regularExpression';

function Profile( { isLoggedIn, onUpdateUserData, onSignOut } ) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetErrors, setValues } = useForm({});
  const [ isEditedOn, setIsEditedOn ] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
      resetErrors();
      setValues({ name: currentUser.name, email: currentUser.email });
      console.log(currentUser)
    }
  }, [currentUser, isLoggedIn]);

  function handleCheckData() {
    const isSameData = currentUser.name === values.name && currentUser.email === values.email;
    console.log(isSameData);
    return isSameData;
  }

  function handleEditClick() {
    setIsEditedOn(!isEditedOn);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUserData({...values});
    setIsEditedOn(!isEditedOn);
  }

  return (
    <main className="profile">
      <h3 className="profile__heading">Привет, { currentUser.name } !</h3>
      <form  className="profile__form">
        <fieldset className="profile__form__field">
          <label htmlFor="name-input" className="profile__label">Имя
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
          <label htmlFor="email-input" className="profile__label">E-mail
            <input
              id="email-input"
              type="email"
              name="email"
              className="profile__input"
              placeholder="Email"
              pattern={ regularExpressionEmail }
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
            <><button type="submit" className="profile__edit-button" onClick={ handleEditClick }>Редактировать </button>
              <button className="profile__sign-out-link" onClick={ onSignOut }> Выйти из аккаунта</button>
            </>
          ) : (
            <button 
              type="submit" 
              className={`profile__save-button ${ isValid && "profile__save-button_active"}`} 
              onClick={ handleSubmit }
              disabled={ !isValid || handleCheckData()}
            >
              Сохранить
            </button>
          )
        }
    </main>
  );
}

export default Profile;
