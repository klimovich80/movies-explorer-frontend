import { Link } from 'react-router-dom'
import './PopupMenu.css'
import {
    endpointMain,
    endpointMovies,
    endpointSavedMovies,
    endpointProfile
} from '../../vendor/constants/endpoints'
import accountLogo from '../../images/account-icon.svg'

export default function PopupMenu({
    isOpen,
    onClose
}) {
    const recentPage = localStorage.getItem('path');

    return (
        <div className={isOpen ? 'popup' : 'popup popup_disabled'}>
            <div className='popup__overlay'>
                <div className='popup__container'>
                    <button
                        className='popup__close-button'
                        aria-label=''
                        onClick={onClose}
                    ></button>
                    <nav className='popup__navigation'>
                        <ul className='popup__list list'>
                            <li className='popup__item'>
                                <Link
                                    className={
                                        recentPage === endpointMain
                                            ? 'account__link link link_active'
                                            : 'account__link link'
                                    }
                                    to={endpointMain}
                                    onClick={onClose}
                                >Главная</Link>
                            </li>
                            <li className='popup__item'>
                                <Link
                                    className={
                                        recentPage === endpointMovies
                                            ? 'account__link link link_active'
                                            : 'account__link link'
                                    }
                                    to={endpointMovies}
                                    onClick={onClose}
                                >Фильмы</Link>
                            </li>
                            <li className='popup__item'>
                                <Link
                                    className={
                                        recentPage === endpointSavedMovies
                                            ? 'account__link link link_active'
                                            : 'account__link link'
                                    }
                                    to={endpointSavedMovies}
                                    onClick={onClose}
                                >Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='account'>
                        <Link
                            className='account__link link'
                            to={endpointProfile}
                            onClick={onClose}>Аккаунт</Link>
                        <img className='logo' src={accountLogo} alt='иконка аккаунта' />
                    </div>
                </div>
            </div>
        </div >
    )
}
