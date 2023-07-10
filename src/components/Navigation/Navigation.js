import { Link } from 'react-router-dom'
import accountLogo from '../../images/account-icon.svg'
import menuIcon from '../../images/menu-icon.svg'
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
                <nav className='navigation navigation__logged-in'>
                    <ul className='navigation__list navigation__movies navigation__list_logged-in'>
                        <li className='navigation__item'>
                            <Link className='navigation__link navigation__link_logged-in' to={endpointMovies}>Фильмы</Link>
                        </li>
                        <li className='navigation__item'>
                            <Link className='navigation__link navigation__link_logged-in' to={endpointSavedMovies}>Сохранённые фильмы</Link>
                        </li>
                    </ul>
                    <ul className='navigation__list navigation__account navigation__list_logged-in'>
                        <li className='navigation__item'>
                            <Link className='navigation__link' to={endpointProfile}>Аккаунт</Link>
                        </li>
                        <li className='navigation__item'>
                            <img className='navigation__logo' src={accountLogo} alt='иконка аккаунта' />
                        </li>
                        {/* <li className='navigation__item item__menu'>
                        </li> */}
                    </ul>
                    <button className='navigation__popup-button'></button>
                </nav>
            ) : (
                <nav className='navigation'>
                    <ul className='navigation__list'>
                        <li className='navigation__item'>
                            <Link className='navigation__link' to={endpointRegister}>Регистрация</Link>
                        </li>
                        <li className='navigation__item'>
                            <Link className='navigation__link navigation__button' to={endpointLogin}>Вход</Link>
                        </li>
                    </ul>

                </nav>
            )}
        </>
    )
}
