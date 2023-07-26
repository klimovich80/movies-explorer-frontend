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
    // constants
    const shortMovieDuration = 40;
    const [isShort, setShort] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('')
    const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [maxMovies, setMaxMovies] = useState(12)
    const [showMore, setShowMore] = useState(3)
    const navigate = useNavigate();
    // рендеринг при начальной загрузке/перезагрузке страницы
    useEffect(() => {
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
                setLoading(false);
                setLoggedIn(true);
                navigate(localStorage.getItem('path'))
            })
            .catch(err => console.log(err.message));
    }, [])
    // рендеринг по условиям

    function resizeWindow() {
        setWindowSize(window.innerWidth)
    }

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

    useEffect(() => {
        window.addEventListener(
            'resize', resizeWindow
        )
        handleResize()
    }, [windowSize])

    useEffect(() => {
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
            .catch((err) => console.log(err));
    }, [token, navigate]);

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
                setLoggedIn(true)
                navigate('/', { replace: true })
            })
            .catch(err => console.log(err))
    }

    function handleLogout() {
        console.log('logging out');
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

    function searchMovie(name) {
        setLoading(true);
        moviesApi.getMovies()
            .then(movies => {
                const foundMovies = (
                    name === '*'
                        ? movies
                        : movies.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase()))
                );
                JSON.parse(localStorage.getItem('isShort'))
                localStorage.setItem('searchInput', name)
                localStorage.setItem('foundMovies', foundMovies);
                setLoading(false);
                setMovies(foundMovies)
            })
            .catch(err => {
                console.log(err);
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
                                        searchInput={localStorage.getItem('searchInput' || '')}
                                        movies={movies}
                                        savedMovie={savedMovie}
                                        handleSavedMovies={handleSavedMovies}
                                        filterShortMovies={filterShortMovies}
                                        maxMovies={maxMovies}
                                        setMaxMovies={setMaxMovies}
                                        showMore={showMore}
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
                                        savedMovies={savedMovies}
                                        savedMovie={savedMovie}
                                        handleSavedMovies={handleSavedMovies}
                                        filterShortMovies={filterShortMovies}
                                        maxMovies={maxMovies}
                                        setMaxMovies={setMaxMovies}
                                        showMore={showMore}
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