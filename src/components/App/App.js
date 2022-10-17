import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

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
      <Footer />
    </div>
  );
}

export default App;
