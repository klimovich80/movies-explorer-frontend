import MyInput from '../UI/MyInput/MyInput'
import { validate, res } from 'react-email-validator'
import { useEffect } from 'react'
import './Profile.css'
import { useFormWithValidation } from '../hooks/useForm'

export default function Profile({
    errorMessage,
    currentUser,
    handleLogout,
    handleProfileEdit,
    isEditableForm,
    setEditableForm,
    isSaved,
    setSaved
}) {
    const {
        values,
        errors,
        handleChange,
        isValid
    } = useFormWithValidation({
        name: currentUser.name,
        email: currentUser.email,
        isValid: false
    });

    useEffect(() => {
        values.name = currentUser.name;
        values.email = currentUser.email;
        errors.name = '';
        errors.email = '';
    }, [currentUser]);

    function enableForm() {
        setEditableForm(true);
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
                            value={values.name}
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
                            value={values.email}
                            onChange={(e) => {
                                validate(e.target.value);
                                handleChange(e)
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
                                    : isValid
                                        ? 'profile__save-button button'
                                        : 'button profile__save-button_disabled profile__save-button'
                            }
                            onClick={handleSubmit}
                            aria-label='Сохранить'
                            disabled={
                                changeDataCheck()
                                    ? true
                                    : !isValid
                            }>
                            Сохранить
                        </button>
                    </>
                    : <>
                        <span
                            className={
                                isSaved
                                    ? 'profile__save-error save-error-visible'
                                    : 'profile__save-error '
                            }>
                            Новые данные успешно сохранены
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
