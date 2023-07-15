import './Register.css'
import { endpointMain } from '../../vendor/constants/endpoints'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import MyInput from '../UI/MyInput/MyInput'

export default function Register() {
    return (
        <section className='register'>
            <form className='register__form'>
                <Link to={endpointMain}>
                    <img className='profile__logo button' src={logo} alt='логотип' />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <label className='reagister__label'>
                    <MyInput />
                </label>
            </form>

        </section>
    )
}
