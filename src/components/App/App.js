import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
// import api from '../../utils/api';
import { movieCards } from '../../utils/movieCards';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
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
    <CurrentUserContext.Provider value={currentUser}>
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
          <Route path="/saved-movies">
            <SavedMovies 
              movieCards={movieCards}
            />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
