import './Portfolio.css';

function Portfolio() {

  return (
   <section className="portfolio">
    <h3 className="portfolio__title">Портфолио</h3>
    <ul className="portfolio__list">
      <li className="portfolio__list__item">
        <a className="portfolio__list__link" href="https://github.com/margarita-tsaruk/how-to-learn" target={ '_blank' } rel="noreferrer">
          Статичный сайт
          <div className="portfolio__list__icon"></div>
        </a>
      </li>
      <li className="portfolio__list__item">
        <a className="portfolio__list__link" href="https://github.com/margarita-tsaruk/russian-travel" target={ '_blank' } rel="noreferrer">
          Адаптивный сайт
          <div className="portfolio__list__icon"></div>
        </a>
      </li>
      <li className="portfolio__list__item">
        <a className="portfolio__list__link" href="https://github.com/margarita-tsaruk/react-mesto-api-full" target={ '_blank' } rel="noreferrer">
          Одностраничное приложение
          <div className="portfolio__list__icon"></div>
        </a>
      </li>
    </ul>
  </section>
  );
}

export default Portfolio;