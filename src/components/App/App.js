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
import Footer from '../Footer/Footer'
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
    const [isLoading, setLoading] = useState(false);
    // functions
    // layout
    return (
        <div className='App'>
            <Header isLoggedIn={isLoggedIn} />
            <Routes>
                <Route path={endpointMain} element={
                    <Main />
                } />
                <Route path={endpointMovies} element={
                    <Movies />
                } />
                <Route path={endpointSavedMovies} element={
                    <SavedMovies />
                } />
                <Route path={endpointProfile} element={
                    <Profile />
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
            <Footer />
        </div>
    )
}

export default App;