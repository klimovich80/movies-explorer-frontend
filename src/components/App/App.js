import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
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
                        <Main />
                        <Footer />
                    </>
                } />
                <Route path='/movies' element={
                    <>
                        <Header />
                        <Movies />
                        <Footer />
                    </>
                } />
                <Route path='/saved-movies' element={
                    <>
                        <Header />
                        <SavedMovies />
                        <Footer />
                    </>
                } />
                <Route path='/profile' element={
                    <>
                        <Header />
                        <Profile />
                        <Footer />
                    </>
                } />
                <Route path='/signin' element={
                    <>
                        <Header />
                        <Login />
                        <Footer />
                    </>
                } />
                <Route path='/signup' element={
                    <>
                        <Header />
                        <Register />
                        <Footer />
                    </>
                } />
            </Routes>

        </div>
    )
}

export default App;