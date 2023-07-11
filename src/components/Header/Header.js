import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import logo from '../../images/logo.svg'
import { endpointMain } from '../../vendor/constants/endpoints'

export default function Header({ isLoggedIn, onOpen }) {
    return (
        <header className={
            isLoggedIn
                ? 'header header_logged-in'
                : 'header'
        } >
            <Link to={endpointMain}>
                <img className='header__logo' src={logo} alt='логотип' />
            </Link>
            <Navigation isLoggedIn={isLoggedIn} onOpen={onOpen} />
        </header >
    )
}
