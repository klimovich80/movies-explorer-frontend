import { Link } from 'react-router-dom'
import './PopupMenu.css'
import {
    ENDPOINT_MAIN,
    ENDPOINT_MOVIES,
    ENDPOINT_SAVED_MOVIES,
    ENDPOINT_PROFILE,
} from '../../vendor/constants/endpoints'
import accountLogo from '../../images/account-icon.svg'

export default function PopupMenu({
    isOpen,
    onClose
}) {
    const recentPage = localStorage.getItem('path');

    return (
        <div className={isOpen ? 'popup' : 'popup popup_disabled'}>
            <div className='popup__overlay' onClick={onClose}>
                <div className='popup__container'>
                    <button
                        className='popup__close-button button'
                        aria-label=''
                        onClick={onClose}
                    ></button>
                    <nav className='popup__navigation'>
                        <ul className='popup__list list'>
                            <li className='popup__item'>
                                <Link
                                    className={
                                        recentPage === ENDPOINT_MAIN
                                            ? 'account__link link link_active'
                                            : 'account__link link'
                                    }
                                    to={ENDPOINT_MAIN}
                                    onClick={onClose}
                                >Главная</Link>
                            </li>
                            <li className='popup__item'>
                                <Link
                                    className={
                                        recentPage === ENDPOINT_MOVIES
                                            ? 'account__link link link_active'
                                            : 'account__link link'
                                    }
                                    to={ENDPOINT_MOVIES}
                                    onClick={onClose}
                                >Фильмы</Link>
                            </li>
                            <li className='popup__item'>
                                <Link
                                    className={
                                        recentPage === ENDPOINT_SAVED_MOVIES
                                            ? 'account__link link link_active'
                                            : 'account__link link'
                                    }
                                    to={ENDPOINT_SAVED_MOVIES}
                                    onClick={onClose}
                                >Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='account'>
                        <Link
                            className='account__link link'
                            to={ENDPOINT_PROFILE}
                            onClick={onClose}>Аккаунт</Link>
                        <img className='logo' src={accountLogo} alt='иконка аккаунта' />
                    </div>
                </div>
            </div>
        </div >
    )
}
