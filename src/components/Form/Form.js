import './Form.css';

function Form( { name, onSubmit, title, children, buttonText, isValid, link, classNames } ) {
  return (
    <form  className={ `form form_type_${name}` } onSubmit={ onSubmit }>
      <h3 className={`${classNames.title}`}>{ title }</h3>
      { children }
      <button 
        type="submit" 
        className={`${classNames.button} ${ isValid && classNames.buttonActive }`}
        disabled={ !isValid }
      >
        { buttonText }
      </button>
      { link }
    </form> 
  );
}

export default Form;
