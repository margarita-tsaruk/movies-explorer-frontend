import React from 'react';
//import { Route, Switch } from 'react-router-dom';
//import Register from '../Register/Register';
import './Main.css';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main() {
  return (
    <div className="content">
      <Promo />
      <AboutProject />
      <Techs />
      {/* <Switch>  
        <Route path="/signup">
          <div className="auth">
            <Register 
             //onSignedUp={handleAuthorization}
            />
          </div>
        </Route>
      </Switch> */}
    </div>
  );
}

export default Main;