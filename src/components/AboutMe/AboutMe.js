import './AboutMe.css';
import Heading from '../Heading/Heading';
import studentImage from '../../images/studentImage.jpg';

function AboutMe(  ) {

  return (
   <section className="about-me">
    <Heading heading={"Студент"} />
    <div className="about-me__info-container">
      <h3 className="about-me__name">Маргарита Царук</h3>
      <h4 className="about-me__job">Веб-разработчик, 34 года</h4>
      <p className="about-me__description">
        Я из Михайловска, но чувствую себя человеком мира. Люблю путешествовать и уже побывала в 17 странах. 
        Меняю HR на IT - мне очень нравится писать код, полностью погружаться в новые знания.
        IT сфера для меня невероятно увлекательна, плюс всегда можно работать удаленно.
        За время учебы смогла реализовать несколько проектов.
      </p>
         
      <nav>
        <ul className="about-me__social-links">
          <li className="about-me__social-links_item">
            <a className="about-me__social-links_link" href="https://github.com/margarita-tsaruk" target={'_blank'} rel="noreferrer">Github</a>
          </li>
          <li className="about-me__social-links_item">
            <a className="about-me__social-links_link" href="https://career.habr.com/margarita-tsaruk" target={'_blank'} rel="noreferrer">Хабр Карьера</a>
          </li>
          <li className="about-me__social-links_item">
            <a className="about-me__social-links_link" href="https://t.me/yamargaritats" target={'_blank'} rel="noreferrer">Telegram</a>
          </li>
        </ul>
      </nav>
      <img className="about-me__photo" src={studentImage} alt="Фото Маргариты" /> 
    </div>

  </section>
  );
}

export default AboutMe;