import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();
  
  function handleClickButtonBack() {
    history.goBack();
  }
  
  return (
    <section className="page-notfound">
      <h2 className="page-notfound__heading">404</h2>
      <p className="page-notfound__information">Страница не найдена</p>
      <button type="button" className="page-notfound__button" onClick={ handleClickButtonBack }> Назад</button>
    </section>
  );
}

export default PageNotFound;
 