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
    mainApi.getToken()
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('inputSearch');
        localStorage.removeItem('checkbox');
      })
  } 

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      handleCheckToken();
    }
  }, []);

  useEffect(() => {
    if(isLoggedIn) {
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          handleInfoTooltip();
          localStorage.removeItem('loggedIn');
          localStorage.removeItem('searchedMovies');
          localStorage.removeItem('inputSearch');
          localStorage.removeItem('checkbox');
        })
    }
  }, [])

  function handleAuthorization(userData) {
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
    .then((userData) => {
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

  function handleUpdateUserInfo(userData) {
    mainApi.updateUserInfo(userData.name, userData.email)
    .then((newUser) => {
      setCurrentUser(prevState => {
        return {
          ...prevState,
          name: newUser.name,
          email: newUser.email,
        }
      })
    })
    .catch((err) => {
      console.log(err);
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
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleChangeMovieStatus(movie, isSaved) {
    //const isSaved = savedMovies.some(i => i.movieId === movie.id);
    mainApi.changeMovieStatus(movie, isSaved) 
      .then((newMovie) => {
        handleGetSavedMovies()
        console.log(savedMovies)
        setSavedMovies(savedMovies.map((currentMovie) => currentMovie.movieId === movie.movieId ? newMovie : currentMovie));
      })
      .catch((err) => {
        console.log(err);
        console.log('Wrong')
      })
  }

  function handleMovieDelete(movie) {
    mainApi.deleteSavedMovie(movie)
    .then(() => {
        handleGetSavedMovies()
        setSavedMovies((state) => state.filter((movie) => movie.movieId !== movie.id));
      })
      .catch((err) => {
        console.log(err);
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
            onMovieDelete={ handleMovieDelete }
          />
          <ProtectedRoute 
            path="/profile"
            isLoggedIn={ isLoggedIn }
            component={ Profile } 
            onUpdateUserData={ handleUpdateUserInfo }
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
