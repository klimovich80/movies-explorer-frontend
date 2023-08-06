import MyInput from '../UI/MyInput/MyInput'
import { validate, res } from 'react-email-validator'
import { useEffect, useState } from 'react'
import './Profile.css'
import { useFormWithValidation } from '../hooks/useForm'
import { mainApi } from '../../utils/MainApi'

export default function Profile({
    errorMessage,
    setErrorMessage,
    currentUser,
    setCurrentUser,
    handleLogout,
    isEditableForm,
    setEditableForm,
    isSaved,
    setSaved
}) {
    const {
        values,
        errors,
        handleChange,
        isValid,
        resetForm
    } = useFormWithValidation({
        name: currentUser.name,
        email: currentUser.email,
        isValid: false
    });

    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        setErrorText(errorText)
        validate(currentUser.email)
        values.name = currentUser.name;
        values.email = currentUser.email;
        errors.name = '';
        errors.email = '';
    }, [currentUser, errorText]);

    function enableForm() {
        setEditableForm(true);
    }

    function handleProfileEdit({ name, email }) {
        setErrorMessage('');
        const token = localStorage.getItem('token')
        mainApi.editProfileInfo(name, email, token)
            .then(({ email, name }) => {
                setEditableForm(false);
                setCurrentUser({ name, email });
                setSaved(true);
                setErrorText('Новые данные успешно сохранены');
            })
            .catch(err => {
                resetForm(currentUser);
                // сделать форму редактируемой
                setEditableForm(false);
                // установить стэйт несохраненных данных
                setSaved(false);
                // если возникла ошибка подключения
                err instanceof TypeError
                    // показать ошибку пользователю
                    ? setErrorText('При обновлении профиля произошла ошибка.')
                    : err.includes('409')
                        ? setErrorText('Пользователь с таким email уже существует.')
                        : setErrorText('При обновлении профиля произошла ошибка.')
            })
    }

    function handleSubmit() {
        handleProfileEdit(values);
        setSaved(true);
    }

    const changeDataCheck = () => {
        return values.name === currentUser.name && values.email === currentUser.email
    }

    return (
        <section className='profile'>
            <form className='profile__form'>
                <fieldset
                    className='profile__fieldset'
                    disabled={!isEditableForm}
                >
                    <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                    <label className='profile__label' htmlFor='profile__name'>
                        <span className='profile__label-title'>Имя</span>
                        <MyInput
                            id='profile__name'
                            name="name"
                            error={errors.name}
                            type='text'
                            required
                            minLength="2"
                            maxLength="30"
                            placeholder='введите имя'
                            value={values.name || ''}
                            onChange={handleChange} />
                    </label>
                    <div className='profile__divider'></div>
                    <label className='profile__label' htmlFor='profile__email'>
                        <span className='profile__label-title'>E-mail</span>
                        <MyInput
                            id='profile__email'
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
                            value={values.email || ''}
                            onChange={(e) => {
                                validate(e.target.value);
                                handleChange(e);
                            }} />
                    </label>
                </fieldset>
            </form>
            {
                isEditableForm
                    ? <>
                        <span
                            className={
                                errorMessage
                                    ? 'profile__save-error save-error-visible'
                                    : 'profile__save-error '
                            }>
                            {errorMessage}
                        </span>
                        <button
                            className={
                                changeDataCheck()
                                    ? 'button profile__save-button_disabled profile__save-button'
                                    : isValid && res
                                        ? 'profile__save-button button'
                                        : 'button profile__save-button_disabled profile__save-button'
                            }
                            onClick={handleSubmit}
                            aria-label='Сохранить'
                            disabled={
                                changeDataCheck()
                                    ? true
                                    : !(isValid && res)
                            }>
                            Сохранить
                        </button>
                    </>
                    : <>
                        <span
                            className={
                                isSaved || errorText !== ''
                                    ? 'profile__save-error save-error-visible'
                                    : 'profile__save-error '
                            }>{errorText}
                        </span>
                        <button
                            className='profile__button'
                            onClick={enableForm}
                            aria-label='Редактировать'
                        >Редактировать
                        </button>
                        <button
                            className='profile__button profile__button_type_logout'
                            onClick={handleLogout}
                            aria-label='Выйти из аккаунта'
                        >Выйти из аккаунта
                        </button>
                    </>
            }

        </section >
    )
}
