// import { useState } from 'react';
import AuthorizedNavigation from '../AuthorizedNavigation/AuthorizedNavigation.js';
import LandingNavigation from '../LandingNavigation/LandingNavigation.js';

function Navigation( { isLoggedIn, onSignedUp } ) {
  return !isLoggedIn ?  <LandingNavigation onSignedUp={onSignedUp}/> : <AuthorizedNavigation />;
}

export default Navigation;
