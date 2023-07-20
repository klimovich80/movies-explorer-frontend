import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import PopupMenu from '../PopupMenu/PopupMenu';
import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import {
    endpointLogin,
    endpointMain,
    endpointMovies,
    endpointProfile,
    endpointRegister,
    endpointSavedMovies,
    endpointUnknown,
} from '../../vendor/constants/endpoints';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { getUserInfo, register, login } from '../../utils/AuthApi';

function App() {
    // constants
    const shortMovieDuration = 40;
    const [currentUser, setCurrentUser] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isShort, setShort] = useState(false);
    const [userName, setUserName] = useState('Павел');
    const [userEmail, setUserEmail] = useState('test@test.ru')
    const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState([])


    useEffect(() => {
        // get user info

        // get saved movies
        // get movies
        moviesApi.getMovies()
            .then((res) => {
                setMovies(res);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, [])

    // functions
    const filterMovies = (moviesArr) => {
        const filteredArray = moviesArr.filter((movie) => {
            return movie.duration <= shortMovieDuration;
        })
        return filteredArray;
    }

    function deleteFromSaved(card) {
        console.log('deleting from saved');
    }

    function addToSaved(card) {
        console.log('adding to saved');
    }

    function handleSavedMovies(movie, saving) {
        console.log('handleSavedMovies called');
        saving
            ? addToSaved(movie)
            : deleteFromSaved(movie)
    }

    function setShortMovies() {
        isShort ? setShort(false) : setShort(true);
    }

    function openPopup() {
        setPopupOpen(true)
    }

    function closePopup() {
        setPopupOpen(false)
    }

    function handleRegistration({ email, password, name }) {
        console.log('registrating');
        register(email, password, name)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function handleLogin({ password, email }) {
        login(password, email)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    // layout
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>
                <Helmet>
                    <html lang='ru' />
                </Helmet>
                <Routes>
                    <Route path={endpointMain} element={
                        <>
                            <Header isLoggedIn={isLoggedIn} onOpen={openPopup} main />
                            <Main />
                            <Footer />
                        </>
                    } />
                    <Route path={endpointMovies} element={
                        <ProtectedRoute element={
                            <>
                                <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                                <Movies
                                    isShort={isShort}
                                    setShortMovies={setShortMovies}
                                    isLoading={isLoading}
                                    movies={
                                        isShort
                                            ? filterMovies(movies)
                                            : movies
                                    }
                                    handleSavedMovies={handleSavedMovies}
                                />
                                <Footer />
                            </>
                        } />

                    } />
                    <Route path={endpointSavedMovies} element={
                        <ProtectedRoute element={
                            <>
                                <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                                <SavedMovies
                                    isShort={isShort}
                                    setShortMovies={setShortMovies}
                                    savedMovies={
                                        isShort
                                            ? filterMovies(savedMovies)
                                            : savedMovies
                                    }
                                    handleSavedMovies={handleSavedMovies}
                                />
                                <Footer />
                            </>
                        } />

                    } />
                    <Route path={endpointProfile} element={
                        <ProtectedRoute element={
                            <>
                                <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                                <Profile userName={userName} userEmail={userEmail} isProfile={true} />
                            </>
                        } />

                    } />
                    <Route path={endpointLogin} element={
                        <Login
                            isProfile={false}
                            handleLogin={handleLogin}
                        />
                    } />
                    <Route path={endpointRegister} element={
                        <Register
                            isProfile={false}
                            handleRegistration={handleRegistration}
                        />
                    } />
                    <Route path={endpointUnknown} element={
                        <PageNotFound />
                    } />
                </Routes>
                {/* menu popup */}
                <PopupMenu
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;