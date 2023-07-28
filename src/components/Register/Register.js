import './Register.css'
import { useEffect } from 'react'
import { useFormWithValidation } from '../hooks/useForm'
import { endpointMain, endpointLogin } from '../../vendor/constants/endpoints'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import MyInput from '../UI/MyInput/MyInput'

export default function Register({
    errorMessage,
    handleRegistration
}) {
    const buttonText = 'Зарегистрироваться';

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm
    } = useFormWithValidation({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        console.log('register use effect called');
        values.name = "";
        values.email = "";
        values.password = "";
        errors.name = "";
        errors.email = "";
        errors.password = "";
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        handleRegistration(values);
        // resetForm();
    }

    return (
        <section className='register'>
            <form className='register__form'>
                <Link to={endpointMain}>
                    <img className='register__logo button' src={logo} alt='логотип' />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <label className='register__label' htmlFor='register__name'>
                    Имя
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
                    E-mail
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
                    Пароль
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
                {errorMessage
                    ? <p className='form__error-message'>{errorMessage}</p>
                    : <></>
                }
                <button
                    className={
                        isValid
                            ? 'register__button button'
                            : 'register__button button button_disabled'
                    }
                    aria-label={buttonText}
                    disabled={!isValid}
                    onClick={handleSubmit}
                >
                    {buttonText}
                </button>
                <p className='register__paragraph'>
                    Уже зарегистрированы ?
                    <Link className='register__link link' to={endpointLogin}> Войти</Link>
                </p>
            </form>

        </section>
    )
}
