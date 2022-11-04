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
  const [ isSaved, setIsSaved ] = useState(null);
  
  function handleAuthorization() {
    console.log(isLoggedIn);
    setIsLoggedIn(!isLoggedIn);
    history.push('/movies');
  }

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

//  function handleGetMovies() {
//   setIsLoading(true)
//   moviesApi.getMovies()
//     .then((movies) => {
//       localStorage.setItem('movies', JSON.stringify(movies));
      
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       setIsLoading(false)
//     })
//   }

  useEffect(() => {
    if(!isLoggedIn) {
      moviesApi.getMovies()
        .then((movies) => {
          setMovieCards(movies);
          console.log(movies)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn])

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
    .then((receivedMovies) => {
      setMovieCards(receivedMovies);
      console.log(receivedMovies)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleChangeMovieStatus(movie) {
    mainApi.changeMovieStatus(movie._id, movie) 
      .then((newMovie) => {
        if(newMovie) {
          handleGetSavedMovies()
        }
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
              //handleGetMovies={ handleGetMovies }
              movieCards={ movieCards }
              isLoading={ isLoading }
              setIsLoading={ setIsLoading }
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies 
            
            />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register 
            onSignedUp={ handleAuthorization } />
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
