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
import PopupMenu from '../PopupMenu/PopupMenu';
import {
    endpointLogin,
    endpointMain,
    endpointMovies,
    endpointProfile,
    endpointRegister,
    endpointSavedMovies,
    endpointUnknown,
} from '../../vendor/constants/endpoints';

function App() {
    // constants
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isShort, setShort] = useState(false);
    const [userName, setUserName] = useState('Павел');
    const [userEmail, setUserEmail] = useState('test@test.ru')
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
                            isLoading={isLoading}
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
                        <Profile userName={userName} userEmail={userEmail} isProfile={true} />
                    </>
                } />
                <Route path={endpointLogin} element={
                    <Login isProfile={false} />
                } />
                <Route path={endpointRegister} element={
                    <Register isProfile={false} />
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