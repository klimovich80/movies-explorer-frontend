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

export default function Navigation({
    isLoggedIn,
    onOpen
}) {
    function setActiveLink(e) {
        const activeClass = 'navigation__link_active';
        const links = e.target.closest('ul').querySelectorAll('.navigation__link')
        links.forEach(link => {
            link.classList.remove(activeClass)
        });
        e.target.classList.add(activeClass);
    }
    return (
        <>
            {isLoggedIn ? (
                <nav className='navigation logged-in'>
                    <ul className='navigation__list list navigation__movies navigation__list_logged-in'>
                        <li className='navigation__item'>
                            <Link
                                className='navigation__link link navigation__link_logged-in'
                                to={endpointMovies}
                                onClick={setActiveLink}
                            >Фильмы</Link>
                        </li>
                        <li className='navigation__item'>
                            <Link
                                className='navigation__link link navigation__link_logged-in'
                                to={endpointSavedMovies}
                                onClick={setActiveLink}
                            >Сохранённые фильмы</Link>
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
                    <button className='navigation__popup-button' aria-label='' onClick={onOpen}></button>
                </nav>
            ) : (
                <nav className='navigation'>
                    <ul className='navigation__list list'>
                        <li className='navigation__item'>
                            <Link className='navigation__link link' to={endpointRegister}>Регистрация</Link>
                        </li>
                        <li className='navigation__item'>
                            <Link className='navigation__link link navigation__button button' to={endpointLogin}>Вход</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}
