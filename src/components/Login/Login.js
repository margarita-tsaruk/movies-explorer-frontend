import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/logo.svg';
import { regularExpressionEmail } from '../../utils/regularExpression';

function Login( { onSignedUp } ) {
  const { values, handleChange, errors, isValid, resetErrors } = useForm({});

  const link = (
    <p className="form__paragraph">
      Еще не зарегистрированы?
      <Link className="form__link" to="/signup">Регистрация</Link>
    </p>
  );
  
  const classNames = {
    title: "form__title",
    button: "form__button form__button_login",
    buttonActive: "form__button_active",
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSignedUp( {...values} );
    resetErrors();
  }

  return (
    <main className="auth">
      <Link to="/">
        <img className="form__logo" src={ logo } alt="Лого" />
      </Link>
      <Form
        name="login"
        title="Рады видеть!"
        buttonText="Войти"
        classNames={ classNames }
        onSubmit={ handleSubmit }
        isValid={ isValid }
        link={ link }
      >
        <fieldset className="form__fieldset">
          <label htmlFor="email-input" className="form__input__label">E-mail</label>
          <input
            id="email-input"
            type="email"
            name="email"
            className={`form__input ${ errors.email && 'form__input_type_invalid' }` }
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            required
            pattern={ regularExpressionEmail }
            value={ values.email || '' }
            onChange={ handleChange } />
          <span className="form__error form__error_top" id="input-email-error">
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
            value={ values.password || '' }
            onChange={ handleChange } />
          <span className="form__error form__error_login-bottom" id="input-password-error">
            { !isValid && errors.password }
          </span>
        </fieldset>
      </Form>
    </main>
  );
}

export default Login;
