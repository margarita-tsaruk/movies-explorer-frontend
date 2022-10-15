import './AboutProject.css';

function AboutProject(  ) {

  return (
   <section className="diploma-project">
      <div className="diploma-project__heading-container">
        <h2 className="diploma-project__heading">О проекте</h2>
      </div>
    <ul className="diploma-project__info">
      <li className="diploma-project__info-list">
        <h3 className="diploma-project__info-title">Дипломный проект включал 5 этапов</h3>
        <p className="diploma-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </li>
      <li className="diploma-project__info-list">
        <h3 className="diploma-project__info-title">На выполнение диплома ушло 5 недель</h3>
        <p className="diploma-project__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </li>
    </ul>
    <div className="diploma-project__time-chart">
      <div className="diploma-project__time-chart_first-line">
        <p className="diploma-project__time-chart_first-line_time-data">1 неделя</p>
        <p className="diploma-project__time-chart_info-data">Back-end</p>
      </div>
      <div className="diploma-project__time-chart_second-line">
        <p className="diploma-project__time-chart_second-line_time-data">4 недели</p>
        <p className="diploma-project__time-chart_info-data">Front-end</p>
      </div>
    </div>
  </section>
  );
}

export default AboutProject;