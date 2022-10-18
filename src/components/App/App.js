import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
// import api from '../../utils/api';
import { movieCards } from '../../utils/movieCards';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [movieCards, setMovieCards] = useState([]);
  
  function handleAuthorization() {
    setIsLoggedIn(true)
  }

  // useEffect(() => {
  //   if(isLoggedIn) {
  //     api.MovieCards()
  //       .then((cardsData) => {
  //         setMovieCards(cardsData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }, [isLoggedIn])

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} onSignedUp={handleAuthorization}/>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies 
            movieCards={movieCards}
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
