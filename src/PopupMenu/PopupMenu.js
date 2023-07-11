import { Link } from 'react-router-dom'
import './PopupMenu.css'
import { endpointMain, endpointMovies, endpointSavedMovies, endpointProfile } from '../vendor/constants/endpoints'
import accountLogo from '../images/account-icon.svg'

export default function PopupMenu({ isOpen, onClose }) {
    return (
        <div className={isOpen ? 'popup' : 'popup__disabled'}>
            <div className='popup__overlay'>
                <div className='popup__container'>
                    <button className='popup__close-button' onClick={onClose}></button>
                    <nav className='popup__navigation'>
                        <ul className='popup__list list'>
                            <li className='popup__item'>
                                <Link className='popup__link link active__link' to={endpointMain}>Главная</Link>
                            </li>
                            <li className='popup__item'>
                                <Link className='popup__link link' to={endpointMovies}>Фильмы</Link>
                            </li>
                            <li className='popup__item'>
                                <Link className='popup__link link' to={endpointSavedMovies}>Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='popup__footer'>
                        <Link className='footer__link link' to={endpointProfile}>Аккаунт</Link>
                        <img className='logo' src={accountLogo} alt='иконка аккаунта' />
                    </div>
                </div>
            </div>
        </div >
    )
}
