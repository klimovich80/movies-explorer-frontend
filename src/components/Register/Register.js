import './Register.css'
import { useEffect } from 'react'
import useForm from '../hooks/useForm'
import { endpointMain, endpointLogin } from '../../vendor/constants/endpoints'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import MyInput from '../UI/MyInput/MyInput'

export default function Register() {
    const buttonText = 'Зарегистрироваться';

    const { values, errors, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        values.name = "";
        values.email = "";
        values.password = "";
        errors.name = "";
        errors.email = "";
        errors.password = "";
    }, []);

    const disableButton = errors.name !== "" || errors.email !== "";

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submitting register form');
        console.log(values);
    }

    return (
        <section className='register'>
            <form className='register__form'>
                <Link to={endpointMain}>
                    <img className='profile__logo button' src={logo} alt='логотип' />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <label className='register__label' htmlFor='register__name'>
                    <MyInput
                        id='register__name'
                        name="name"
                        error={errors.name}
                        type='text'
                        required
                        minLength="2"
                        maxLength="30"
                        placeholder='введите имя'
                        value={values.name}
                        onChange={handleChange}
                    />
                </label>
                <label className='register__label' htmlFor='register__email'>
                    <MyInput
                        id='register__email'
                        name="email"
                        error={errors.email}
                        type='email'
                        required
                        minLength="2"
                        maxLength="30"
                        placeholder='введите е-майл'
                        value={values.email}
                        onChange={handleChange}
                    />
                </label>
                <label className='register__label' htmlFor='register__password'>
                    <MyInput
                        id='register__password'
                        name="password"
                        error={errors.password}
                        type='password'
                        required
                        placeholder='введите пароль'
                        value={values.password}
                        onChange={handleChange}
                    />
                </label>
                <button
                    className='register__button button'
                    aria-label={buttonText}
                    disabled={disableButton}
                    onClick={handleSubmit}
                >
                    {buttonText}
                </button>
                <p className='register__paragraph'>
                    <Link className='register__link link' to={endpointLogin}>Войти</Link>
                </p>
            </form>

        </section>
    )
}
