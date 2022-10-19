// import { useState } from 'react';
import AuthorizedNavigation from '../AuthorizedNavigation/AuthorizedNavigation.js';
import NavTab from '../NavTab/NavTab.js';

function Navigation( { isLoggedIn, onSignedUp } ) {
  return !isLoggedIn ?  <NavTab onSignedUp={onSignedUp}/> : <AuthorizedNavigation />;
}

export default Navigation;
