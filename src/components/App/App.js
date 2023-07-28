import { Route, Routes, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
    // states
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShort, setShort] = useState(false)
    const [maxMovies, setMaxMovies] = useState(12)
    const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [connectionError, setConnectionError] = useState(false)
    const [showMore, setShowMore] = useState(3)
    const [token, setToken] = useState(null);
    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('');
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    // constants
    const shortMovieDuration = 40;
    const navigate = useNavigate();

    // useEffects
    // initial rendering
    useEffect(() => {
        setLoading(true);
        console.log('initial rendering');
        const jwt = localStorage.getItem("token");
        setToken(jwt);
        Promise.all([
            mainApi.getProfileInfo(jwt),
            mainApi.getSavedMovies(jwt),
        ])
            .then(([info, savedMovies]) => {
                setUserEmail(info.email);
                setUserName(info.name);
                setCurrentUser(info);
                setSavedMovies(savedMovies);
                setLoggedIn(true);
                navigate(localStorage.getItem('path'))
            })
            .catch(err => {
                console.log(err.message)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [])
    // rendering on conditions
    useEffect(() => {
        setLoading(true);
        console.log('secondary rendering');
        const path = window.location.pathname;
        if (!token) {
            return;
        }
        getUserInfo(token)
            .then((data) => {
                setUserEmail(data.email);
                setUserName(data.name);
                setLoggedIn(true);
                setCurrentUser(data);
                setSavedMovies(savedMovies)
                setLoggedIn(true);
                localStorage.setItem('path', path);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            });
    }, [token, navigate]);
    // rendering on window resize
    useEffect(() => {
        console.log('window resizing rendering');
        window.addEventListener(
            'resize', resizeWindow)
        handleResize()
    }, [windowSize])

    // functions
    function resizeWindow() {
        setWindowSize(window.innerWidth)
    }

    // set quantity of movies to display
    function handleResize() {
        if (windowSize >= 1280) {
            setMaxMovies(12)
            setShowMore(3)
        } else if (windowSize >= 768) {
            setMaxMovies(8)
            setShowMore(2)
        } else if (windowSize >= 320) {
            setMaxMovies(5)
            setShowMore(2)
        }
    }
    // filter out short movies function
    const filterShortMovies = (moviesArr) => {
        return moviesArr.filter((movie) => {
            return movie.duration <= shortMovieDuration;
        })
    }

    function deleteFromSaved(movie) {
        const movieToDelete = savedMovies.find(
            m => m.owner === currentUser._id && m.movieId === (movie.id || movie.movieId)
        )
        if (!movieToDelete) return
        mainApi.deleteMovie(movieToDelete._id, token)
            .then((res) => {
                console.log(res);
                setSavedMovies(
                    savedMovies.filter(m => m._id !== movieToDelete._id)
                )
            })
            .catch(err => console.log(err))
    }

    function addToSaved(movie) {
        mainApi.addMovie(movie, token)
            .then((movie) => {
                setSavedMovies([...savedMovies, movie])
            })
            .catch(err => console.log(err))
    }

    function handleSavedMovies(movie, saving) {
        saving
            ? addToSaved(movie)
            : deleteFromSaved(movie)
    }

    function openPopup() {
        setPopupOpen(true)
    }

    function closePopup() {
        setPopupOpen(false)
    }

    function handleRegistration({ email, password, name }) {
        register(email, password, name)
            .then((res) => {
                console.log(res);
                navigate("/signin", { replace: true });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleLogin({ password, email }) {
        login(password, email)
            .then(({ token }) => {
                localStorage.setItem("token", token);
                setToken(token);
                setLoggedIn(true);
                navigate('/movies', { replace: true });
            })
            .catch(err => console.log(err))
    }

    function handleLogout() {
        setToken(null);
        setLoggedIn(false);
        setUserEmail('');
        setUserName('')
        localStorage.clear();
        setCurrentUser({});
        setMovies([])
        navigate("/", { replace: true });
    }

    function savedMovie(movie) {
        return savedMovies.some(
            item => item.owner === currentUser._id && movie.id === item.movieId
        )
    }

    function findMovies(moviesArr, name) {
        if (name === '*')
            return moviesArr
        return moviesArr.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase()))
    }

    function searchMovie(name) {
        setLoading(true);
        moviesApi.getMovies()
            .then(movies => {
                setConnectionError(false);
                const foundMovies = findMovies(movies, name);
                const foundSavedMovies = findMovies(savedMovies, name)
                JSON.parse(localStorage.getItem('isShort'));
                const stringFoundMovies = JSON.stringify(foundMovies);
                const stringFoundSavedMovies = JSON.stringify(foundSavedMovies);

                localStorage.setItem('searchInput', name)
                localStorage.setItem('foundMovies', stringFoundMovies);
                localStorage.setItem('foundSavedMovies', stringFoundSavedMovies);
            })
            .catch(err => {
                console.log(err);
                setConnectionError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    // layout
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>
                <Helmet>
                    <html lang='ru' />
                </Helmet>
                <Routes>
                    <Route
                        path={endpointMain}
                        element={
                            <>
                                <Header
                                    isLoggedIn={isLoggedIn}
                                    onOpen={openPopup} />
                                <Main />
                                <Footer />
                            </>
                        } />
                    <Route
                        path={endpointMovies}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header
                                        isLoggedIn={isLoggedIn}
                                        onOpen={openPopup} />
                                    <Movies
                                        isShort={isShort}
                                        setShort={setShort}
                                        searchMovie={searchMovie}
                                        isLoading={isLoading}
                                        searchInput={localStorage.getItem('searchInput') || ''}
                                        movies={JSON.parse(localStorage.getItem('foundMovies')) || movies}
                                        savedMovie={savedMovie}
                                        handleSavedMovies={handleSavedMovies}
                                        filterShortMovies={filterShortMovies}
                                        maxMovies={maxMovies}
                                        setMaxMovies={setMaxMovies}
                                        showMore={showMore}
                                        connectionError={connectionError}
                                    />
                                    <Footer />
                                </>
                            } isLoggedIn={isLoggedIn} />
                        } />
                    <Route
                        path={endpointSavedMovies}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                                    <SavedMovies
                                        isShort={isShort}
                                        setShort={setShort}
                                        searchMovie={searchMovie}
                                        isLoading={isLoading}
                                        searchInput={localStorage.getItem('searchInput') || ''}
                                        savedMovies={JSON.parse(localStorage.getItem('foundSavedMovies')) || savedMovies}
                                        savedMovie={savedMovie}
                                        handleSavedMovies={handleSavedMovies}
                                        filterShortMovies={filterShortMovies}
                                        maxMovies={maxMovies}
                                        setMaxMovies={setMaxMovies}
                                        showMore={showMore}
                                        connectionError={connectionError
                                        }
                                    />
                                    <Footer />
                                </>
                            } isLoggedIn={isLoggedIn} />

                        } />
                    <Route
                        path={endpointProfile}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header
                                        isLoggedIn={isLoggedIn}
                                        onOpen={openPopup}
                                    />
                                    <Profile
                                        userName={userName}
                                        userEmail={userEmail}
                                        handleLogout={handleLogout}
                                    />
                                </>
                            } isLoggedIn={isLoggedIn} />

                        } />
                    <Route
                        path={endpointLogin}
                        element={
                            <Login
                                isProfile={false}
                                handleLogin={handleLogin}
                            />
                        } />
                    <Route
                        path={endpointRegister}
                        element={
                            <Register
                                isProfile={false}
                                handleRegistration={handleRegistration}
                            />
                        } />
                    <Route
                        path={endpointUnknown}
                        element={
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