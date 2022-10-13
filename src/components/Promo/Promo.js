import React from 'react';
import './Promo.css';
import promoLogo from '../../images/promo-logo.svg'

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <button 
            type="button" 
            className="promo__button"
      >Узнать больше</button>
      <img className="promo__logo" src={promoLogo} alt="Промо-лого" />
    </section>
  );
}

export default Promo;