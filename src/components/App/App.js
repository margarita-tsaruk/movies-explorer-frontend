import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  function handleAuthorization() {
    setIsLoggedIn(true)
  }

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} onSignedUp={handleAuthorization}/>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
