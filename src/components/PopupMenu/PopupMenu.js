import { Link } from 'react-router-dom'
import './PopupMenu.css'
import { endpointMain, endpointMovies, endpointSavedMovies, endpointProfile } from '../../vendor/constants/endpoints'
import accountLogo from '../../images/account-icon.svg'

export default function PopupMenu({ isOpen, onClose }) {
    function setActiveLink(e) {
        const links = e.target.closest('ul').querySelectorAll('.popup__link')
        links.forEach(link => {
            link.classList.remove('link_active')
        });
        e.target.classList.add('link_active');
        onClose();
    }
    return (
        <div className={isOpen ? 'popup' : 'popup popup_disabled'}>
            <div className='popup__overlay'>
                <div className='popup__container'>
                    <button className='popup__close-button' aria-label='' onClick={onClose}></button>
                    <nav className='popup__navigation'>
                        <ul className='popup__list list'>
                            <li className='popup__item'>
                                <Link
                                    className='popup__link link'
                                    to={endpointMain}
                                    onClick={setActiveLink}>Главная</Link>
                            </li>
                            <li className='popup__item'>
                                <Link
                                    className='popup__link link'
                                    to={endpointMovies}
                                    onClick={setActiveLink}>Фильмы</Link>
                            </li>
                            <li className='popup__item'>
                                <Link
                                    className='popup__link link'
                                    to={endpointSavedMovies}
                                    onClick={setActiveLink}
                                >Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='account'>
                        <Link className='account__link link' to={endpointProfile} onClick={onClose}>Аккаунт</Link>
                        <img className='logo' src={accountLogo} alt='иконка аккаунта' />
                    </div>
                </div>
            </div>
        </div >
    )
}
