import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Main from '../Main/Main'
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
                        <Header className='Header' />
                        <Navigation className='Navigation' />
                        <Main className='Name' />
                        <Footer className='Footer' />
                    </>
                } />
            </Routes>

        </div>
    )
}

export default App;