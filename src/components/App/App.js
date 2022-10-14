import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  function handleAuthorization() {
    setIsLoggedIn(true)
  }

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} onSignedUp={handleAuthorization}/>
   
      <Main />
      
    </div>
  );
}

export default App;
