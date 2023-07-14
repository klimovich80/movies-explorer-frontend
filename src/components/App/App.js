import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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
import PopupMenu from '../../PopupMenu/PopupMenu';
import {
    endpointLogin,
    endpointMain,
    endpointMovies,
    endpointProfile,
    endpointRegister,
    endpointSavedMovies,
    endpointUnknown,
} from '../../vendor/constants/endpoints';

// TODO check fonts
// TODO PP check
// --landing 1280 done
// --landing 768 done
// --landing 320 done
// TODO состояния ссылок и кнопок
// TODO check BEM :
// --App done
// --PopupMenu done
// --AboutMe done
// --AboutProject done
// --Footer done
// --Header done
// --Main done
// --Navigation done
// --Portfolio done
// --Promo done
// --Techs done
// --SearchForm done
// --FilterCheckbox done
// --Movies
// --MoviesCard



function App() {
    // constants
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isShort, setShort] = useState(false);
    // functions
    function setShortMovies() {
        isShort ? setShort(false) : setShort(true);
    }

    function deleteFromSaved() {
        console.log('deleting this card from saved');
    }

    function openPopup() {
        setPopupOpen(true)
    }

    function closePopup() {
        setPopupOpen(false)
    }
    // layout
    return (
        <div className='app'>
            <Routes>
                <Route path={endpointMain} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                        <Main />
                        <Footer />
                    </>
                } />
                <Route path={endpointMovies} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                        <Movies
                            isShort={isShort}
                            setShortMovies={setShortMovies}
                        />
                        <Footer />
                    </>
                } />
                <Route path={endpointSavedMovies} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                        <SavedMovies
                            isShort={isShort}
                            setShortMovies={setShortMovies}
                            deleteFromSaved={deleteFromSaved}
                        />
                        <Footer />
                    </>
                } />
                <Route path={endpointProfile} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} onOpen={openPopup} />
                        <Profile />
                    </>
                } />
                <Route path={endpointLogin} element={
                    <Login />
                } />
                <Route path={endpointRegister} element={
                    <Register />
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
    )
}

export default App;