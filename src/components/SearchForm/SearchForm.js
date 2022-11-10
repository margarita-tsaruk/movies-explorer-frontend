import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import './SearchForm.css';

function SearchForm( { onSearchMovies, onCheckbox, isChecked, input, errоr } ) {
  const { values, isValid, handleChange, resetErrors, setValues } = useForm({});
  const checkButtonClassName = (
    `search__form__checkbox ${ !isChecked ? "search__form__checkbox_on" : "search__form__checkbox_off" }`
  );

  useEffect(() => {
    setValues( { search: input } );
  }, [input, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSearchMovies(values.search, isChecked);
      resetErrors();
    } else {
      errоr('Нужно ввести ключевое слово')
    }
  }
  
  return (
    <section className="search">
      <form className="search__form" name="form">
        <div className="search__form__container">
          <input
            id="search-input"
            type="text"
            name="search"
            className="search__form__input"
            placeholder="Фильм"
            value={ values.search || '' }
            onChange={ handleChange }
            required
          />
          <button type="submit" className="search__form__button" onClick={ handleSubmit }>
            Поиск
          </button>
        </div>
        <div className="search__form__container_checkbox">
          <label className="search__form__container_label">
            <input
              type="checkbox"
              className="search__form__input_checkbox"
              value={ isChecked }
              onChange={ onCheckbox }
            />
              <span className={ checkButtonClassName }/>
          </label>
          <p className="search__form__info">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;