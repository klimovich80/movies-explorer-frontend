import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
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
    ENDPOINT_LOGIN,
    ENDPOINT_MAIN,
    ENDPOINT_MOVIES,
    ENDPOINT_PROFILE,
    ENDPOINT_REGISTER,
    ENDPOINT_SAVED_MOVIES,
    ENDPOINT_UNKNOWN,
} from '../../vendor/constants/endpoints';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { register, login } from '../../utils/AuthApi';

function App() {
    // states
    const [currentUser, setCurrentUser] = useState({});
    const [connectionError, setConnectionError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditableForm, setEditableForm] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShort, setShort] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [maxMovies, setMaxMovies] = useState(12);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([])
    const [showMore, setShowMore] = useState(3);
    const [token, setToken] = useState(null);
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    // constants
    const shortMovieDuration = 40;
    const navigate = useNavigate();

    // useEffects
    // initial rendering
    useEffect(() => {
        setLoading(true);
        const jwt = localStorage.getItem("token");
        setToken(jwt);
        mainApi.getProfileInfo(jwt)
            .then((data) => {
                setCurrentUser(data);
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
        const path = window.location.pathname;
        if (!token) {
            return;
        }
        Promise.all([
            mainApi.getProfileInfo(token),
            mainApi.getSavedMovies(token),
            moviesApi.getMovies()
        ])
            .then(([data, savedItems, items]) => {
                moviesToShow(savedItems, items);
                setLoggedIn(true);
                setCurrentUser(data);
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
        window.addEventListener('resize', resizeWindow)
        handleResize()

        // remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', resizeWindow);
        };
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
                if (err.message) {
                    if (err.message.includes('Failed')) {
                        setErrorMessage('500 На сервере произошла ошибка.')
                    }
                } else {
                    if (err.includes('409')) {
                        setErrorMessage('Пользователь с таким email уже существует.')
                    } else if (err.includes('404')) {
                        setErrorMessage('404 Страница по указанному маршруту не найдена.')
                    } else {
                        setErrorMessage('При регистрации пользователя произошла ошибка.')
                    }
                }
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
            .catch(err => {
                console.log(err)
                if (err.message) {
                    setErrorMessage("Что-то пошло не так...")
                } else {
                    if (err.includes('401')) {
                        setErrorMessage('Вы ввели неправильный логин или пароль.')
                    }
                }
            })
    }

    function handleLogout() {
        setToken(null);
        setLoggedIn(false);
        setCurrentUser({});
        setErrorMessage('');
        setSavedMovies([]);
        setMovies([]);
        localStorage.clear();
        navigate("/", { replace: true });
    }

    function handleProfileEdit({ name, email }) {
        setErrorMessage('');
        mainApi.editProfileInfo(name, email, token)
            .then(({ email, name }) => {
                setEditableForm(false);
                setCurrentUser({ name, email });
                setSaved(true);
            })
            .catch(err => {
                setEditableForm(true);
                setSaved(false);
                if (err.includes('409')) {
                    setErrorMessage('Пользователь с таким email уже существует.')
                    return;
                }
                setErrorMessage('При обновлении профиля произошла ошибка.');
            })
    }

    const moviesToShow = (savedItems, items) => {
        const movieName = localStorage.getItem('searchInput');
        // if there was a search 
        if (movieName) {
            // initiate search function
            searchMovie(movieName)
        } else {
            //set everything with the values fron server
            setMovies(items);
            setSavedMovies(savedItems);
        }
    }

    function findMovies(moviesArr, name) {
        if (name === '*')
            return moviesArr
        return moviesArr.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase()))
    }

    function searchMovie(name) {
        setLoading(true);
        Promise.all([
            moviesApi.getMovies(),
            mainApi.getSavedMovies(token),
        ])
            .then(([items, savedItems]) => {
                setConnectionError(false);
                const foundMovies = findMovies(items, name);
                const foundSavedMovies = findMovies(savedItems, name)
                setMovies(foundMovies);
                setSavedMovies(foundSavedMovies);
                JSON.parse(localStorage.getItem('isShort'));
                localStorage.setItem('searchInput', name)
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
                        path={ENDPOINT_MAIN}
                        element={
                            <>
                                <Header
                                    isLoggedIn={isLoggedIn}
                                    onOpen={openPopup}
                                />
                                <Main />
                                <Footer />
                            </>
                        } />
                    <Route
                        path={ENDPOINT_MOVIES}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header
                                        isLoggedIn={isLoggedIn}
                                        onOpen={openPopup} />
                                    <Movies
                                        currentUser={currentUser}
                                        isShort={isShort}
                                        setShort={setShort}
                                        searchMovie={searchMovie}
                                        isLoading={isLoading}
                                        searchInput={localStorage.getItem('searchInput') || ''}
                                        movies={movies}
                                        setSavedMovies={setSavedMovies}
                                        savedMovies={savedMovies}
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
                        path={ENDPOINT_SAVED_MOVIES}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                                    <SavedMovies
                                        currentUser={currentUser}
                                        isShort={isShort}
                                        setShort={setShort}
                                        searchMovie={searchMovie}
                                        isLoading={isLoading}
                                        searchInput={localStorage.getItem('searchInput') || ''}
                                        savedMovies={savedMovies}
                                        setSavedMovies={setSavedMovies}
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
                        path={ENDPOINT_PROFILE}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header
                                        isLoggedIn={isLoggedIn}
                                        onOpen={openPopup}
                                    />
                                    <Profile
                                        errorMessage={errorMessage}
                                        currentUser={currentUser}
                                        handleLogout={handleLogout}
                                        handleProfileEdit={handleProfileEdit}
                                        isEditableForm={isEditableForm}
                                        setEditableForm={setEditableForm}
                                        isSaved={isSaved}
                                        setSaved={setSaved}
                                    />
                                </>
                            } isLoggedIn={isLoggedIn} />

                        } />
                    <Route
                        path={ENDPOINT_LOGIN}
                        element={
                            <Login
                                errorMessage={errorMessage}
                                isProfile={false}
                                handleLogin={handleLogin}
                            />
                        } />
                    <Route
                        path={ENDPOINT_REGISTER}
                        element={
                            <Register
                                errorMessage={errorMessage}
                                isProfile={false}
                                handleRegistration={handleRegistration}
                            />
                        } />
                    <Route
                        path={ENDPOINT_UNKNOWN}
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
