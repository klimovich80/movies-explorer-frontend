import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import logo from '../../images/logo.svg'

export default function Header({ isLoggedIn }) {
    return (
        <>
            {isLoggedIn ? (
                <header className='header header__logged-in'>
                    <Link to='/'>
                        <img className='header__logo' src={logo} alt='логотип' />
                    </Link>
                    <Navigation isLoggedIn={isLoggedIn} />
                </header>) : (
                <header className='header'>
                    <Link to='/'>
                        <img className='header__logo' src={logo} alt='логотип' />
                    </Link>
                    <Navigation isLoggedIn={isLoggedIn} />
                </header>)}
        </>
    )
}
