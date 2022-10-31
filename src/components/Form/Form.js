import './Form.css';

function Form( { name, onSubmit, title, children, buttonText, isDisabled, link, buttonClass } ) {
  return (
    <form  className={ `form form_type_${name}` } onSubmit={ onSubmit }>
      <h3 className="form__title">{ title }</h3>
      { children }
      <button 
        type="submit" 
        className={`${buttonClass.buttonActive} ${!isDisabled ? buttonClass.buttonDisabled : ''}`}
        disabled={ !isDisabled }
      >
        { buttonText }
      </button>
      { link }
    </form> 
  );
}

export default Form;
