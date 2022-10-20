import './AboutProject.css';
import Heading from '../Heading/Heading';

function AboutProject(  ) {

  return (
   <section className="about-project" id="about-project">
    <Heading heading={"О проекте"} />
    <ul className="about-project__info">
      <li className="about-project__info-list">
        <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </li>
      <li className="about-project__info-list">
        <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </li>
    </ul>
    <div className="about-project__time-chart">
      <div className="about-project__time-chart_first-line">
        <p className="about-project__time-chart_first-line_time-data">1 неделя</p>
        <p className="about-project__time-chart_info-data">Back-end</p>
      </div>
      <div className="about-project__time-chart_second-line">
        <p className="about-project__time-chart_second-line_time-data">4 недели</p>
        <p className="about-project__time-chart_info-data">Front-end</p>
      </div>
    </div>
  </section>
  );
}

export default AboutProject;