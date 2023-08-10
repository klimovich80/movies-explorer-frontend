import './Login.css'
import { Link } from 'react-router-dom';
import { validate, res } from 'react-email-validator';
import { useEffect, useState } from 'react';
import { useFormWithValidation } from '../hooks/useForm';
import MyInput from '../UI/MyInput/MyInput';
import { ENDPOINT_MAIN, ENDPOINT_REGISTER } from '../../vendor/constants/endpoints';
import logo from '../../images/logo.svg';

export default function Login({
    errorMessage,
    handleLogin
}) {
    const buttonText = 'Войти';
    const {
        values,
        errors,
        handleChange,
        isValid
    } = useFormWithValidation({
        email: '',
        password: ''
    });

    const [isValidForm, setValidForm] = useState(isValid);

    useEffect(() => {
        values.email = "";
        values.password = "";
        errors.email = "";
        errors.password = "";
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(values, setValidForm)
    }
    return (
        <section className='login'>
            <form className='login__form'>
                <Link to={ENDPOINT_MAIN}>
                    <img className='login__logo button' src={logo} alt='логотип' />
                </Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <label className='login__label' htmlFor='login__email'>
                    E-mail
                    <MyInput
                        id='login__email'
                        name="email"
                        error={
                            res
                                ? errors.email
                                : errors.email
                                    ? errors.email
                                    : 'email должен быть в формате user@domain.any'
                        }
                        type='email'
                        required
                        minLength="2"
                        maxLength="30"
                        placeholder='введите е-майл'
                        value={values.email}
                        onChange={(e) => {
                            validate(e.target.value);
                            handleChange(e)
                        }}
                    />
                </label>
                <label className='login__label' htmlFor='login__password'>
                    Пароль
                    <MyInput
                        id='login__password'
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
                        isValidForm
                            ? 'login__button button'
                            : 'login__button button button_disabled'
                    }
                    aria-label={buttonText}
                    disabled={!isValidForm}
                    onClick={handleSubmit}
                >
                    {buttonText}
                </button>
                <p className='login__paragraph'>
                    Ещё не зарегистрированы ?
                    <Link className='login__link link' to={ENDPOINT_REGISTER}> Регистрация</Link>
                </p>
            </form>

        </section>
    )
}
