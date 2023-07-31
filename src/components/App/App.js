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
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditableForm, setEditableForm] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShort, setShort] = useState(false)
    const [maxMovies, setMaxMovies] = useState(12)
    // const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('foundSavedMovies')))
    const [connectionError, setConnectionError] = useState(false)
    const [showMore, setShowMore] = useState(3)
    const [token, setToken] = useState(null);
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
            .then(([data, savedMovies]) => {
                setCurrentUser(data);
                setSavedMovies(savedMovies);
                console.log('Saved Movies:');
                console.log(savedMovies);
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
        Promise.all([
            mainApi.getProfileInfo(token),
            mainApi.getSavedMovies(token),
        ])
            .then(([data, savedMovies]) => {
                setLoggedIn(true);
                setCurrentUser(data);
                setSavedMovies(savedMovies)
                console.log('Saved Movies');
                console.log(savedMovies);
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
            m => m.owner === currentUser._id && (m.movieId === (movie.id || movie.movieId))
        )
        if (!movieToDelete) return
        setLoading(true)
        mainApi.deleteMovie(movieToDelete._id, token)
            .then((res) => {
                console.log('card deleted');
                console.log(res);
                setSavedMovies(state =>
                    state.filter(mov => mov._id !== movieToDelete._id)
                )
                console.log('saved Movies after delete');
                console.log(savedMovies);
            })
            .catch(err => {
                console.log('cannot delete card');
                console.log(err)
            })
            .finally(() => setLoading(false));
    }

    function addToSaved(movie) {
        setLoading(true)
        mainApi.addMovie(movie, token)
            .then((movie) => {
                setSavedMovies([movie, ...savedMovies])
                console.log('saved Movies after add:');
                console.log(savedMovies);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    function handleSavedMovies(movie, saving) {
        console.log('handling saved movies');
        saving
            ? addToSaved(movie)
            : deleteFromSaved(movie)
        console.log('found saved movies:');
        console.log(JSON.parse(localStorage.getItem('foundSavedMovies')));
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
                console.log(token);
                localStorage.setItem("token", token);
                setToken(token);
                setLoggedIn(true);
                navigate('/movies', { replace: true });
            })
            .catch(err => {
                console.dir(err)
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
        // setMovies([]);
        setSavedMovies([]);
        setErrorMessage('');
        localStorage.clear();
        navigate("/", { replace: true });
    }

    function handleProfileEdit({ name, email }) {
        setErrorMessage('');
        mainApi.editProfileInfo(name, email, token)
            .then(({ email, name }) => {
                setEditableForm(false);
                setCurrentUser({ name, email })
            })
            .catch(err => {
                setEditableForm(true);
                if (err.includes('409')) {
                    setErrorMessage('Пользователь с таким email уже существует.')
                    return;
                }
                setErrorMessage('При обновлении профиля произошла ошибка.')
            })
    }

    function isSavedMovie(movie) {
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
                console.log('foundSavedMovies');
                console.log(JSON.parse(stringFoundSavedMovies));

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
                                    onOpen={openPopup}
                                />
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
                                        movies={JSON.parse(localStorage.getItem('foundMovies'))}
                                        isSavedMovie={isSavedMovie}
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
                                        isSavedMovie={isSavedMovie}
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
                                        errorMessage={errorMessage}
                                        currentUser={currentUser}
                                        handleLogout={handleLogout}
                                        handleProfileEdit={handleProfileEdit}
                                        isEditableForm={isEditableForm}
                                        setEditableForm={setEditableForm}
                                    />
                                </>
                            } isLoggedIn={isLoggedIn} />

                        } />
                    <Route
                        path={endpointLogin}
                        element={
                            <Login
                                errorMessage={errorMessage}
                                isProfile={false}
                                handleLogin={handleLogin}
                            />
                        } />
                    <Route
                        path={endpointRegister}
                        element={
                            <Register
                                errorMessage={errorMessage}
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

// TODO film and saved films stopped working due to changes between users
// TODO check data interchange between different users
// disable button if new user name === old one
// close menu popup on esc
// remove event listeners
// see if getUserInfo can be replaced by the same func in mainApi and deleted