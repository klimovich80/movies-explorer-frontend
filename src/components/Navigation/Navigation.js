import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    return (
        <nav className='navigation'>
            <Link className='navigation__link' to='/signup'>Регистрация</Link>
            <Link className='navigation__link navigation__button' to='/signin'>Вход</Link>
        </nav>
    )
}
