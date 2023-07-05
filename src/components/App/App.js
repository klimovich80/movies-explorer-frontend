import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Main from '../Main/Main'
import Movies from '../Movies'
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
            </Routes>

        </div>
    )
}

export default App;