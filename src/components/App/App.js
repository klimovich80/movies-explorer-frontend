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

// TODO PP check
// TODO состояния ссылок и кнопок
// TODO check BEM :
// --Navigation done
// --Promo done
// --Header done
// --App done

function App() {
    // constants
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isPopupOpen, setPopupOpen] = useState(true);
    const [isLoading, setLoading] = useState(false);
    // functions
    // layout
    return (
        <div className='app'>
            <Routes>
                <Route path={endpointMain} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} />
                        <Main />
                        <Footer />
                    </>
                } />
                <Route path={endpointMovies} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} />
                        <Movies />
                        <Footer />
                    </>
                } />
                <Route path={endpointSavedMovies} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} />
                        <SavedMovies />
                        <Footer />
                    </>
                } />
                <Route path={endpointProfile} element={
                    <>
                        <Header isLoggedIn={isLoggedIn} />
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
            <PopupMenu isPopupOpen={isPopupOpen} />
        </div>
    )
}

export default App;