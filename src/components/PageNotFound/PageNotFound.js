import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <section className="page-notfound">
      <h2 className="page-notfound__heading">404</h2>
      <p className="page-notfound__information">Страница не найдена</p>
      <Link className="page-notfound__link" to="/"> Назад</Link>
    </section>
  );
}

export default PageNotFound;
