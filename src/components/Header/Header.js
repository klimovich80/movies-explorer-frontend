import { Link } from 'react-router-dom'
import './Header.css'
import Navigation from '../Navigation/Navigation'
import logo from '../../images/logo.svg'

export default function Header() {
    return (
        <header className='header'>
            <Link to='/'>
                <img className='header__logo' src={logo} alt='логотип' />
            </Link>
            <Navigation />
        </header>
    )
}
