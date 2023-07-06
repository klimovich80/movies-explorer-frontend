import { Link } from 'react-router-dom'
import accountLogo from '../../images/account-icon.svg'
import './Navigation.css'
import { endpointLogin, endpointMovies, endpointProfile, endpointRegister, endpointSavedMovies } from '../../vendor/constants/endpoints'

export default function Navigation({ isLoggedIn }) {
    return (
        <>
            {isLoggedIn ? (
                <nav className='navigation'>
                    <Link className='navigation__link navigation__link_logged-in' to={endpointMovies}>Фильмы</Link>
                    <Link className='navigation__link navigation__link_logged-in' to={endpointSavedMovies}>Сохранённые фильмы</Link>
                    <Link className='navigation__link' to={endpointProfile}>Аккаунт
                    </Link>
                    <img className='accountLogo' src={accountLogo} alt='иконка аккаунта' />
                </nav>
            ) : (
                <nav className='navigation'>
                    <Link className='navigation__link' to={endpointRegister}>Регистрация</Link>
                    <Link className='navigation__link navigation__button' to={endpointLogin}>Вход</Link>
                </nav>
            )}
        </>
    )
}
