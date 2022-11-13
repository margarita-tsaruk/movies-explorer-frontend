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
  const [ isLoggedIn, setIsLoggedIn ] = useState(JSON.parse(localStorage.getItem('loggedIn'))); 
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ movieCards, setMovieCards ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen ] = useState(false);
  const [ popupTitle, setPopupTitle ] = useState('');
  
  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCheckToken() {
    mainApi.getToken()
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
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
    if (isLoggedIn) {
      handleCheckToken();
    }
  }, []);

  function handleGetMovies() {
    moviesApi.getMovies()
      .then((movies) => {
        setMovieCards(movies);
        console.log(movies)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getData()
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData);
          //handleGetMovies();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn])

  function handleAuthorization(userData) {
    mainApi.authorize(userData)
    .then((userData) => {
      if (userData) {
        localStorage.setItem('loggedIn', true);
        handleCheckToken();
        handleGetMovies();
        setIsLoggedIn(true);
        history.push('/movies');
        handleInfoTooltip();
        setPopupTitle('Вы успешно вошли в приложение!');
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      handleInfoTooltip();
      setPopupTitle('Что-то пошло не так, попробуйте еще раз!');
    })
  }

  function handleRegistration(userData) {
    mainApi.register(userData)
    .then((newUserData) => {
      if (newUserData) {
        handleAuthorization(userData);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      handleInfoTooltip();
      setPopupTitle('Что-то пошло не так, попробуйте ещё раз!');
    })
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
      handleInfoTooltip();
      setPopupTitle('Профайл успешно обновлен');
    })
    .catch((err) => {
      console.log(err);
      handleInfoTooltip();
      setPopupTitle('Ошибка обновления профиля! Введите имя или email в правильном формате!');
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

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
    .then((receivedMovies) => {
      setSavedMovies(receivedMovies);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleChangeMovieStatus(movie) {
    const isSaved = savedMovies.some(i => i.movieId === movie.id);
    mainApi.changeMovieStatus(movie, isSaved) 
      .then((newMovie) => {
        handleGetSavedMovies()
        setSavedMovies(savedMovies.map((savedMovie) => 
          savedMovie.movieId === movie.id ? newMovie : savedMovie));
      })
      .catch((err) => {
        console.log(err);
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
      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('inputSearch');
      localStorage.removeItem('checkbox');
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
          popupTitle={popupTitle}
          onClose={ closePopup }
          isLoggedIn={ isLoggedIn }
        />
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
