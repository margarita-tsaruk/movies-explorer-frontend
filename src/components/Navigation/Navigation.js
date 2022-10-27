// import { useState } from 'react';
import AuthorizedNav from '../AuthorizedNav/AuthorizedNav.js';
import NavTab from '../NavTab/NavTab.js';

function Navigation( { isLoggedIn, onSignedUp, onChangeMenu } ) {
  return !isLoggedIn ?  <NavTab onSignedUp={ onSignedUp }/> : <AuthorizedNav isLoggedIn={ isLoggedIn } onChangeMenu={ onChangeMenu } />;
}

export default Navigation;
