import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Main from '../Main/Main'
import Movies from '../Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Footer from '../Footer/Footer'
function App() {
    // constants
    // functions
    // layout
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={
                    <>
                        <Header />
                        <Navigation />
                        <Main />
                        <Footer />
                    </>
                } />
                <Route path='/movies' element={
                    <>
                        <Header />
                        <Navigation />
                        <Movies />
                        <Footer />
                    </>
                } />
                <Route path='/saved-movies' element={
                    <>
                        <Header />
                        <Navigation />
                        <SavedMovies />
                        <Footer />
                    </>
                } />
                <Route path='/profile' element={
                    <>
                        <Header />
                        <Navigation />
                        <Profile />
                        <Footer />
                    </>
                } />
                <Route path='/signin' element={
                    <>
                        <Header />
                        <Navigation />
                        <Login />
                        <Footer />
                    </>
                } />
                <Route path='/signup' element={
                    <>
                        <Header />
                        <Navigation />
                        <Register />
                        <Footer />
                    </>
                } />
            </Routes>

        </div>
    )
}

export default App;