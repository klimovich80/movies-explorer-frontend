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
import {
    DESKTOP_DISPLAY_SIZE,
    DESKTOP_CARDS_DISPLAY,
    DESKTOP_CARDS_MORE,
    PAD_DISPLAY_SIZE,
    PAD_CARDS_DISPLAY,
    PAD_CARDS_MORE,
    PHONE_DISPLAY_SIZE,
    PHONE_CARDS_DISPLAY,
    PHONE_CARDS_MORE,
    SHORT_MOVIE_DURATION
} from '../../vendor/constants/constants';

function App() {
    // states
    const [currentUser, setCurrentUser] = useState({});
    const [connectionError, setConnectionError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [foundMovies, setFoundMovies] = useState('');
    const [isEditableForm, setEditableForm] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShort, setShort] = useState(JSON.parse(localStorage.getItem('isShort')) || false);
    const [isSaved, setSaved] = useState(false);
    const [maxMovies, setMaxMovies] = useState(12);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([])
    const [showMore, setShowMore] = useState(3);
    const [token, setToken] = useState(null);
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    // constants
    const navigate = useNavigate();

    // useEffects
    // initial rendering
    useEffect(() => {
        console.log(localStorage);
        console.log(('1'));
        setLoading(true);
        const jwt = localStorage.getItem("token");
        setToken(jwt);
        Promise.all([
            mainApi.getProfileInfo(jwt),
            moviesApi.getMovies()
        ])
            .then(([data, items]) => {
                setCurrentUser(data);
                setMovies(items);
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
        console.log('2');
        setLoading(true);
        const path = window.location.pathname;
        if (!token) {
            return;
        }
        Promise.all([
            mainApi.getProfileInfo(token),
            mainApi.getSavedMovies(token)
        ])
            .then(([data, savedItems]) => {
                console.log(movies);
                moviesToShow(movies);
                setSavedMovies(savedItems);
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
        if (windowSize >= DESKTOP_DISPLAY_SIZE) {
            setMaxMovies(DESKTOP_CARDS_DISPLAY)
            setShowMore(DESKTOP_CARDS_MORE)
        } else if (windowSize >= PAD_DISPLAY_SIZE) {
            setMaxMovies(PAD_CARDS_DISPLAY)
            setShowMore(PAD_CARDS_MORE)
        } else if (windowSize >= PHONE_DISPLAY_SIZE) {
            setMaxMovies(PHONE_CARDS_DISPLAY)
            setShowMore(PHONE_CARDS_MORE)
        }
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
                navigate("/movies", { replace: true });
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
        console.log(localStorage);
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

    const moviesToShow = (items) => {
        console.log(`isShort in rendering 2: ${isShort}`);
        const movieName = localStorage.getItem('searchInput');
        // if there was a search 
        if (movieName) {
            // initiate search function
            console.log(`there was a search, setting movies`);
            console.log(movieName);
            searchMovie(false, movieName)
            return
        } else {
            //set everything with the values fron server
            console.log(`setting everything as usual`);
            return items
        }
    }

    // filter out short movies function
    const filterShortMovies = (moviesArr) => {
        return moviesArr.filter((movie) => {
            return movie.duration <= SHORT_MOVIE_DURATION;
        })
    }

    function findMovies(moviesArr, name) {
        console.log('findMovies funct ->');
        console.log(moviesArr);
        console.log(name);
        console.log(`isShort in findMovies: ${isShort}`);
        if (name === '*')
            return isShort
                ? filterShortMovies(moviesArr)
                : moviesArr
        return isShort
            ? filterShortMovies(moviesArr.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase())))
            : moviesArr.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase()))
    }

    function searchMovie(isSavedMoviesPage, name) {
        console.log('search initiated');
        console.log(name);
        const items = isSavedMoviesPage
            ? savedMovies
            : movies
        console.log(items);
        const foundItems = findMovies(items, name);
        console.log(foundItems);
        setFoundMovies(foundItems);
        localStorage.setItem('searchInput', name)
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
                                        movies={foundMovies}
                                        setSavedMovies={setSavedMovies}
                                        savedMovies={savedMovies}
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

// TODO настроить корректное отображения фильмов при первой загрузке с учетом положения фильтра
// сейчас при первой загрузке происходит простая загрузка c инвертированнным поиском
// и при первом поиске все становится на место
