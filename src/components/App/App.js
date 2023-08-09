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
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);
    const [isEditableForm, setEditableForm] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [maxMovies, setMaxMovies] = useState(DESKTOP_CARDS_DISPLAY);
    const [savedMovies, setSavedMovies] = useState([])
    const [showMore, setShowMore] = useState(DESKTOP_CARDS_MORE);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    // constants
    const navigate = useNavigate();

    // useEffects
    // initial rendering
    useEffect(() => {
        console.log('1');
        setLoading(true);
        const jwt = localStorage.getItem("token");
        setToken(jwt);
        Promise.all([
            mainApi.getProfileInfo(jwt),
            mainApi.getSavedMovies(jwt)
        ])
            .then(([data, items]) => {
                setCurrentUser(data);
                setSavedMovies(items);
                setFoundSavedMovies(items);
                console.log('foundMovies in 1');
                console.log(foundSavedMovies);
            })
            .catch(err => {
                console.log(err)
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
                setSavedMovies(savedItems);
                setLoggedIn(true);
                setCurrentUser(data);
                setFoundSavedMovies(savedItems);
                localStorage.setItem('path', path);
                handleResize();
                console.log('foundMovies in 2');
                console.log(foundSavedMovies);
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

        // remove event listener when a component unmounts
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

    function handleRegistration(data, setValidForm) {
        const { email, password, name } = data;
        setValidForm(false)
        register(email, password, name)
            .then((res) => {
                handleLogin({ password, email }, setValidForm)
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
            .finally(() => {
                setValidForm(true)
            })
    }

    function handleLogin({ password, email }, setValid) {
        setValid(false);
        login(password, email)
            .then(({ token }) => {
                localStorage.setItem("token", token);
                setToken(token);
                setLoggedIn(true);
                navigate(ENDPOINT_MOVIES);
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
            .finally(() => setValid(true))
    }

    function handleLogout() {
        // очищаем все стэйты
        setConnectionError(false)
        setCurrentUser({});
        setErrorMessage('');
        setFoundMovies('');
        setLoggedIn(false);
        setToken(null);
        setSavedMovies([]);
        setEditableForm(false);
        setLoading(true);
        setPopupOpen(false);
        setSaved(false);
        setMaxMovies(DESKTOP_CARDS_DISPLAY);
        setShowMore(DESKTOP_CARDS_MORE);
        setWindowSize(window.innerWidth)
        // обнуляем всё локальное хранилище
        localStorage.clear();
        // переходим на главную страницу
        navigate(ENDPOINT_MAIN);
    }

    // функция фильтрации короткометражек
    function filterShortMovies(items) {
        // возвращаем отфильтрованный массив 
        return items.filter((movie) => {
            // в который заносятся все фильмы с заданными параметрами длительности
            return movie.duration <= SHORT_MOVIE_DURATION;
        })
    }
    // функция возвращает найденные фильмы
    function findMovies(name, isSavedMoviesPage, isShort) {
        const movies = JSON.parse(localStorage.getItem('movies')) || [];

        // если флаг isSavedMoviesPage
        const items = isSavedMoviesPage
            //true - передаем массив сохраненных фильмов
            ? savedMovies
            // false - передаем массив фильмов
            : movies

        // если искомое значение - звездочка
        if (name === '*') {
            // исходя из положения чекбокса короткометражек
            return isShort
                // возвращаем все короктометражные фильмы
                ? filterShortMovies(items)
                // возвращаем все фильмы
                : items
        }
        //filterShortMovies(items.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase())))
        // исходя из положения чекбокса короткометражек
        return isShort
            // возвращаем найденные короктометражные фильмы
            ? filterShortMovies(items.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase())))
            // возвращаем найденные фильмы
            : items.filter(m => m.nameRU.toLowerCase().includes(name.toLowerCase()))
    }

    function storeFoundMovies(isSavedMoviesPage, name, movies, isShort) {
        const foundItems = findMovies(name, isSavedMoviesPage, isShort);
        isSavedMoviesPage
            ? setFoundSavedMovies(foundItems)
            : setFoundMovies(foundItems);
        // запоминаем значение строки поиска для перезагрузки страницы
        console.log(`saved movie page? ;'${isSavedMoviesPage}'`);
        const notSearchedYet = localStorage.getItem('searchInput') === null;
        console.log(`notSearchedYet: ${notSearchedYet}`);
        const toStoreToLocal = !isSavedMoviesPage && !notSearchedYet;
        console.log(`to store to local: '${toStoreToLocal}'`);

        if (toStoreToLocal) {
            console.log('setting input to local from storeFoundMovies');
            localStorage.setItem('searchInput', name || '')
            // формируем из полученных фильмов строку 
            const moviesToStore = JSON.stringify(movies)
            // и кладём в локальное хранилище
            localStorage.setItem('movies', moviesToStore || '')
        }
    }
    // функция поиска фильмов
    function searchMovie(isSavedMoviesPage, name, isShortFlag) {
        console.log(`searchMovie name from input: '${name}'`);
        // console.log(`localStorage input value:` + localStorage.getItem('searchInput'));
        const isShort = isSavedMoviesPage
            ? isShortFlag
            : JSON.parse(localStorage.getItem('isShort'))
        // достаем из локального хранилища фильмы
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        // если поиск фильмов ещё не производился и в локальном хранилище ничего нет
        if (movies.length === 0 && !isSavedMoviesPage) {
            // включаем прелоадер
            setLoading(true)
            // обращаемся к апишке за фильмамиа
            moviesApi.getMovies()
                // если данные из сервера пришли
                .then(res => {
                    // формируем из полученных фильмов строку 
                    const moviesToStore = JSON.stringify(res);
                    // и кладём в локальное хранилище
                    localStorage.setItem('movies', moviesToStore);
                    // запоминаем значение строки поиска для перезагрузки страницы
                    if (!isSavedMoviesPage) {
                        console.log('setting input to local from getMovies.api');
                        localStorage.setItem('searchInput', name || '')
                    }
                    // storeFoundMovies(isSavedMoviesPage, name, movies, isShort)
                    setFoundMovies(findMovies(name, isSavedMoviesPage, isShort));
                    console.log(`found movies in promise`);
                    console.log(foundMovies);
                })
                // если пришла ошибка
                .catch(err => {
                    // отображаем её
                    console.log(err);
                })
                // в любом случае
                .finally(() => {
                    // отключаем прелоадер
                    setLoading(false)
                })
        } else {
            console.log(`search movie function else called`);
            storeFoundMovies(isSavedMoviesPage, name, movies, isShort)
        }
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
                                    isLoggedIn={isLoggedIn || token !== null}
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
                                        isLoggedIn={isLoggedIn || token !== null}
                                        onOpen={openPopup} />
                                    <Movies
                                        currentUser={currentUser}
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
                            } isLoggedIn={isLoggedIn || token !== null} />
                        } />
                    <Route
                        path={ENDPOINT_SAVED_MOVIES}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header isLoggedIn={isLoggedIn || token !== null} onOpen={openPopup} />
                                    <SavedMovies
                                        currentUser={currentUser}
                                        searchMovie={searchMovie}
                                        isLoading={isLoading}
                                        savedMovies={savedMovies}
                                        movies={foundSavedMovies}
                                        setSavedMovies={setSavedMovies}
                                        maxMovies={maxMovies}
                                        setMaxMovies={setMaxMovies}
                                        showMore={showMore}
                                        connectionError={connectionError}
                                    />
                                    <Footer />
                                </>
                            } isLoggedIn={isLoggedIn || token !== null} />
                        } />
                    <Route
                        path={ENDPOINT_PROFILE}
                        element={
                            <ProtectedRoute element={
                                <>
                                    <Header
                                        isLoggedIn={isLoggedIn || token !== null}
                                        onOpen={openPopup}
                                    />
                                    <Profile
                                        errorMessage={errorMessage}
                                        setErrorMessage={setErrorMessage}
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                        handleLogout={handleLogout}
                                        isEditableForm={isEditableForm}
                                        setEditableForm={setEditableForm}
                                        isSaved={isSaved}
                                        setSaved={setSaved}
                                    />
                                </>
                            } isLoggedIn={isLoggedIn || token !== null} />
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
                        element={<PageNotFound />}
                    />
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
