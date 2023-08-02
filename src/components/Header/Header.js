import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import logo from '../../images/logo.svg'
import { ENDPOINT_MAIN } from '../../vendor/constants/endpoints'

export default function Header({ isLoggedIn, onOpen, main }) {
    return (
        <header className={
            main
                ? 'header header_main'
                : 'header'
        } >
            <Link to={ENDPOINT_MAIN}>
                <img className='header__logo button' src={logo} alt='логотип' />
            </Link>
            <Navigation isLoggedIn={isLoggedIn} onOpen={onOpen} />
        </header >
    )
}
