import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import logo from '../../images/logo.svg';
import { regularExpressionName, regularExpressionEmail } from '../../utils/regularExpressions';

function Register( { onSignedUp, isInputDisabled, setIsInputDisabled } ) {
  const { values, handleChange, errors, isValid } = useForm({});
  
  const link = (
    <p className="form__paragraph">
      Уже зарегистрированы?
      <Link className="form__link" to="/signin">Войти</Link>
    </p>
  );

  const classNames = {
    title: "form__title",
    button: "form__button",
    buttonActive: "form__button_active",
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSignedUp( {...values} );
    setIsInputDisabled(true);
  }

  return (
    <main className="auth">
      <Link to="/">
        <img className="form__logo" src={ logo } alt="Лого" />
      </Link>
      <Form
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        classNames={ classNames }
        onSubmit={ handleSubmit }
        isValid={ isValid }
        link={ link }
      >
        <fieldset className="form__fieldset">
          <label htmlFor="name-input" className="form__input__label">Имя</label>
          <input
            id="name-input"
            type="text"
            name="name"
            className={ `form__input ${ errors.name && 'form__input_type_invalid' }` }
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            pattern={ regularExpressionName }
            required
            disabled={ isInputDisabled }
            value={ values.name || '' }
            onChange={ handleChange } />
          <span className="form__error form__error_top" id="input-email-error">
            { !isValid && errors.name }
          </span>
          <label htmlFor="email-input" className="form__input__label">E-mail</label>
          <input
            id="email-input"
            type="email"
            name="email"
            pattern={ regularExpressionEmail }
            className={`form__input ${ errors.email && 'form__input_type_invalid'}` }
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            required
            disabled={ isInputDisabled }
            value={ values.email || '' }
            onChange={ handleChange } />
          <span className="form__error form__error_middle" id="input-email-error">
            { !isValid && errors.email }
          </span>
          <label htmlFor="password-input" className="form__input__label">Пароль</label>
          <input
            id="password-input"
            type="password"
            name="password"
            className={ `form__input ${ errors.password && 'form__input_type_invalid' }` }
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
            disabled={ isInputDisabled }
            value={ values.password || '' }
            onChange={ handleChange } />
          <span className="form__error form__error_bottom" id="input-password-error">
            { !isValid && errors.password }
          </span>
        </fieldset>
      </Form>
    </main>
  );
}

export default Register;
