import './AboutProject.css';
import Heading from '../Heading/Heading';

function AboutProject(  ) {

  return (
   <section className="about-project" id="about-project">
    <Heading heading={"О проекте"} />
    <ul className="about-project__info-list">
      <li className="about-project__info-list__item">
        <h3 className="about-project__info-list__title">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__info-list__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </li>
      <li className="about-project__info-list__item">
        <h3 className="about-project__info-list__title">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__info-list__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </li>
    </ul>
    <div className="about-project__time-chart">
      <div className="about-project__time-chart__first-line">
        <p className="about-project__time-chart__first-line__time-data">1 неделя</p>
        <p className="about-project__time-chart__data">Back-end</p>
      </div>
      <div className="about-project__time-chart__second-line">
        <p className="about-project__time-chart__second-line__time-data">4 недели</p>
        <p className="about-project__time-chart__data">Front-end</p>
      </div>
    </div>
  </section>
  );
}

export default AboutProject;