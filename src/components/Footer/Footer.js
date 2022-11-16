import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; { new Date().getFullYear() }</p>
        <ul className="footer__links">
          <li className="footer__links_item">
            <a className="footer__links_link" href="https://praktikum.yandex.ru" target={'_blank'} rel="noreferrer"> Яндекс.Практикум</a>
          </li>
          <li className="footer__links_item">
            <a className="footer__links_link" href="https://github.com/margarita-tsaruk" target={'_blank'} rel="noreferrer">Github</a>
          </li>
        </ul>
     </div>
    </footer>
  );
}

export default Footer;
