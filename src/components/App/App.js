import { useState } from 'react';
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
// import api from '../../utils/api';
import { movieCards } from '../../utils/movieCards';

import './App.css';

function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  // const [movieCards, setMovieCards] = useState([]);
  
  function handleAuthorization() {
    console.log(isLoggedIn);
    setIsLoggedIn(!isLoggedIn);
    history.push('/movies');
  }

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
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
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies 
              movieCards={ movieCards }
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
