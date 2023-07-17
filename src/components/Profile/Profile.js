import { Link } from 'react-router-dom'
import MyInput from '../UI/MyInput/MyInput'
import { useState, useEffect } from 'react'
import './Profile.css'
import useForm from '../hooks/useForm'
import { endpointMain } from '../../vendor/constants/endpoints'

export default function Profile({ userName, userEmail, isProfile }) {
    const [isDisabled, setDisabled] = useState(true);
    const [isSaveError, setSaveError] = useState(false)

    const { values, errors, handleChange } = useForm({
        name: userName,
        email: userEmail
    });

    useEffect(() => {
        values.name = userName;
        values.email = userEmail;
        errors.name = "";
        errors.email = "";
    }, []);

    function enableForm() {
        setDisabled(false);
    }

    function disableForm() {
        setDisabled(true);
    }

    function handleSubmit() {
        console.log('handling saving data from profile form');
        disableForm();
    }
    const disableButton = errors.name !== '' || errors.email !== '';

    return (
        <section className='profile'>
            <form className='profile__form'>
                <fieldset className='profile__fieldset' disabled={isDisabled}>
                    <h2 className='profile__title'>Привет, {userName}!</h2>
                    <label className='profile__label' htmlFor='profile__name'>
                        <span className='profile__label_title'>Имя</span>
                        <MyInput
                            id='profile__name'
                            name="name"
                            error={errors.name}
                            type='text'
                            required
                            minLength="2"
                            maxLength="30"
                            placeholder='введите имя'
                            value={values.name}
                            onChange={handleChange} />
                    </label>
                    <div className='profile__divider'></div>
                    <label className='profile__label' htmlFor='profile__email'>
                        <span className='profile__label_title'>E-mail</span>
                        <MyInput
                            id='profile__email'
                            name="email"
                            error={errors.email}
                            type='email'
                            required
                            minLength="2"
                            maxLength="30"
                            placeholder='введите е-майл'
                            value={values.email}
                            onChange={handleChange} />
                    </label>
                </fieldset>
            </form>
            {isDisabled
                ? <>
                    <button className='profile__button' onClick={enableForm} aria-label='Редактировать'>Редактировать</button>
                    <Link className='profile__link link' to={endpointMain}>Выйти из аккаунта</Link>
                </>
                : <>
                    <span
                        className={
                            isSaveError
                                ? 'profile__save--error_visible'
                                : 'profile__save--error '
                        }>
                        При обновлении профиля произошла ошибка.
                    </span>
                    <button
                        className={
                            isSaveError
                                ? 'profile__save-button profile__save-button_error button'
                                : disableButton
                                    ? "profile__save-button profile__save-button_error"
                                    : 'profile__save-button button'
                        }
                        onClick={handleSubmit}
                        aria-label='Сохранить'
                        disabled={disableButton}>
                        Сохранить
                    </button>
                </>
            }

        </section >
    )
}
