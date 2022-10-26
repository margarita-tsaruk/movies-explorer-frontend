// import { useState } from 'react';
import AuthorizedNav from '../AuthorizedNav/AuthorizedNav.js';
import NavTab from '../NavTab/NavTab.js';

function Navigation( { isLoggedIn, onSignedUp } ) {
  return !isLoggedIn ?  <NavTab onSignedUp={onSignedUp}/> : <AuthorizedNav />;
}

export default Navigation;
