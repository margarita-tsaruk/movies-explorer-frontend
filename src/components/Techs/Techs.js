import './Techs.css';

function Techs() {

  return (
   <section className="technologies">
      <div className="technologies__heading-container">
        <h2 className="technologies__heading">Технологии</h2>
      </div>
      <h3 className="technologies__title">7 технологий</h3>
      <p className="technologies__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="technologies__list">
        <li className="technologies__list__item">HTML</li>
        <li className="technologies__list__item">CSS</li>
        <li className="technologies__list__item">JS</li>
        <li className="technologies__list__item">React</li>
        <li className="technologies__list__item">Git</li>
        <li className="technologies__list__item">Express.js</li> 
        <li className="technologies__list__item">mongoDB</li>
      </ul>
  </section>
  );
}

export default Techs;