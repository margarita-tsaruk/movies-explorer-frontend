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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import './App.css';

function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ movieCards, setMovieCards ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen ] = useState(false);
  
  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCheckToken() {
    mainApi.getUserData()
      .then(([userData, savedMovies]) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setSavedMovies(savedMovies);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      handleCheckToken();
    }
  }, []);

  function handleAuthorization(userData) {
    console.log(isLoggedIn);
    mainApi.authorize(userData)
    .then((userData) => {
      localStorage.setItem('loggedIn', true);
      setCurrentUser(userData.data);
      setIsLoggedIn(true);
      history.push('/movies');
      handleInfoTooltip();
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      handleInfoTooltip();
    })
  }

  function handleRegistration(userData) {
    setIsLoading(true);
    mainApi.register(userData)
    .then((data) => {
      handleAuthorization(userData); 
     
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      handleInfoTooltip();
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  
  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
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

  function handleChangeMovieStatus(movie, id, isSaved) {
    mainApi.changeMovieStatus(movie, id, isSaved) 
      .then((savedMovie) => {
        handleGetSavedMovies()
          console.log(savedMovie)
      })
      .catch((err) => {
        console.log(err);
        console.log('Wrong')
      })
  }

  function handleSignOut() {
    mainApi.signOut()
    .then((res) => {
      setIsLoggedIn(false);
      setCurrentUser({});
      localStorage.removeItem('loggedIn');
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
    });
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
            <Main isLoggedIn={ isLoggedIn } />
          </Route>
          <Route exact path="/signup">
            <Register 
            onSignedUp={ handleRegistration } />
          </Route>
          <Route exact path="/signin">
            <Login 
            onSignedUp={ handleAuthorization } />
          </Route>
          <ProtectedRoute 
            path="/movies"
            isLoggedIn={ isLoggedIn }
            component={ Movies } 
            movieCards={ movieCards }
            isLoading={ isLoading }
            setIsLoading={ setIsLoading }
            savedMovies={ savedMovies }
            onSaveMovies={ handleChangeMovieStatus }
          />
          <ProtectedRoute 
            path="/saved-movies"
            isLoggedIn={ isLoggedIn }
            component={ SavedMovies } 
            savedMovies={ savedMovies }
            onSaveMovies={ handleChangeMovieStatus }
          />
          <ProtectedRoute 
            path="/profile"
            isLoggedIn={ isLoggedIn }
            component={ Profile } 
            onSignOut={ handleSignOut }
          />
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
        <InfoTooltip
          isPopupOpened={ isInfoTooltipPopupOpen }
          onClose={ closePopup }
          isLoggedIn={ isLoggedIn }
        />
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
