
import './SearchForm.css';
import { useState } from 'react';

function SearchForm() {
  const [isChecked, setIsChecked] = useState(false);
  
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleCheck() {
    setIsChecked(!isChecked);
  }
  
  return (
    <section className="search">
      <form className="search__form" name="form">
        <div className="search__form__container">
          <input
            id="search-input"
            type="text"
            name="name"
            className="search__form__input"
            placeholder="Фильм"
          />
          <button type="submit" className="search__form__button" onClick={handleSubmit}>
            Поиск
          </button>
        </div>
        <div className="search__form__container_checkbox">
          <label className="search__form__container_label">
            <input
              type="checkbox"
              className="search__form__input_checkbox"
              value={isChecked}
              onChange={handleCheck}
            />
              <span className={ !isChecked ? "search__form__checkbox_on" : "search__form__checkbox_off" }/>
          </label>
          <p className="search__form__info">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;