import { Link } from 'react-router-dom'
import accountLogo from '../../images/account-icon.svg'
import './Navigation.css'
import {
    endpointLogin,
    endpointMovies,
    endpointProfile,
    endpointRegister,
    endpointSavedMovies
} from '../../vendor/constants/endpoints'

export default function Navigation({ isLoggedIn }) {
    return (
        <>
            {isLoggedIn ? (
                <nav className='navigation logged-in'>
                    <ul className='navigation__list list navigation__movies navigation__list_logged-in'>
                        <li className='navigation__item'>
                            <Link className='navigation__link link navigation__link_logged-in' to={endpointMovies}>Фильмы</Link>
                        </li>
                        <li className='navigation__item'>
                            <Link className='navigation__link link navigation__link_logged-in' to={endpointSavedMovies}>Сохранённые фильмы</Link>
                        </li>
                    </ul>
                    <ul className='navigation__list list navigation__account navigation__list_logged-in'>
                        <li className='navigation__item'>
                            <Link className='navigation__link link' to={endpointProfile}>Аккаунт</Link>
                        </li>
                        <li className='navigation__item'>
                            <img className='navigation__logo' src={accountLogo} alt='иконка аккаунта' />
                        </li>
                    </ul>
                    <button className='navigation__popup-button'></button>
                </nav>
            ) : (
                <nav className='navigation'>
                    <ul className='navigation__list list'>
                        <li className='navigation__item'>
                            <Link className='navigation__link link' to={endpointRegister}>Регистрация</Link>
                        </li>
                        <li className='navigation__item'>
                            <Link className='navigation__link link navigation__button' to={endpointLogin}>Вход</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}
