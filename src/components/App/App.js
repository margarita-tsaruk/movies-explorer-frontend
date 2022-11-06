import { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Menu from '../Menu/Menu';
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import './App.css';

function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
 
  const [ movieCards, setMovieCards ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  
  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

 function handleRegistration(userData) {
  setIsLoading(true);
  mainApi.register(userData)
  .then((data) => {
    handleAuthorization(userData); 
    handleInfoTooltip();
  })
  .catch((err) => {
    console.log(err);
    handleInfoTooltip();
  })
}

 
 
 
  function handleAuthorization() {
    console.log(isLoggedIn);
    setIsLoggedIn(!isLoggedIn);
    history.push('/movies');
  }

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if(!isLoggedIn) {
      moviesApi.getMovies()
        .then((movies) => {
          setMovieCards(movies);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn])

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
    .then((receivedMovies) => {
      setSavedMovies(receivedMovies);
      console.log(receivedMovies)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleChangeMovieStatus(movie) {
    mainApi.changeMovieStatus(movie) 
      .then((savedMovie) => {
 
          console.log(savedMovie)
        
      })
      .catch((err) => {
        console.log(err);
        console.log('Wrong')
      })
  }


  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        { pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile"
            ? (
              <Header isLoggedIn={ isLoggedIn } onSignedUp={ handleAuthorization } onChangeMenu={handleMenuOpen} />
            ) : (
              " "
            )
        }
        <Menu isMenuOpen={ isMenuOpen } onChangeMenu={ handleMenuOpen } />
        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/movies">
            <Movies 
              movieCards={ movieCards }
              isLoading={ isLoading }
              setIsLoading={ setIsLoading }
              savedMovies={ savedMovies }
              onSaveMovies={ handleChangeMovieStatus }
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies 
              savedMovies={ savedMovies }
              onSaveMovies={ handleChangeMovieStatus }
            />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register 
            onSignedUp={ handleRegistration } />
          </Route>
          <Route path="/signin">
            <Login 
            onSignedUp={ handleAuthorization } />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        { pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" 
          ? (
            <Footer />
          ) : (
            " "
          )
        }
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
