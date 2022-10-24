import './Techs.css';
import Heading from '../Heading/Heading'

function Techs() {

  return (
   <section className="techs">
      <Heading heading={"Технологии"} />  
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__list__item">HTML</li>
        <li className="techs__list__item">CSS</li>
        <li className="techs__list__item">JS</li>
        <li className="techs__list__item">React</li>
        <li className="techs__list__item">Git</li>
        <li className="techs__list__item">Express.js</li> 
        <li className="techs__list__item">mongoDB</li>
      </ul>
  </section>
  );
}

export default Techs;