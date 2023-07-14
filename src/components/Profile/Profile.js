import { Link } from 'react-router-dom'
import MyInput from '../UI/MyInput/MyInput'
import { useState } from 'react'
import './Profile.css'
import useForm from '../hooks/useForm'
import { endpointMain } from '../../vendor/constants/endpoints'

export default function Profile({ userName, isProfile }) {
    const [isDisabled, setDisabled] = useState(true);
    const { values, errors, handleChange } = useForm({
        name: '',
        email: ''
    });

    function enableForm() {
        setDisabled(false)
    }

    return (
        <section className='profile'>
            <form className='profile__form'>
                <fieldset className='profile__fieldset' disabled={isDisabled}>
                    <h2 className='profile__title'>Привет, {userName}!</h2>
                    <label className='profile__label' htmlFor='profile__name'>Имя
                        <MyInput
                            id='profile__name'
                            type='text'
                            placeholder='введите имя'
                            isDisabled={isDisabled}
                            isProfile={isProfile}
                            value={userName}
                            onChange={handleChange} />
                    </label>
                    <div className='profile__divider'></div>
                    <label className='profile__label' htmlFor='profile__email'>E-mail
                        <MyInput
                            id='profile__email'
                            type='email'
                            placeholder='введите е-майл в формате some@email.any'
                            isDisabled={isDisabled}
                            isProfile={isProfile}
                            value='pavelklim@mail.ru'
                            onChange={handleChange} />
                    </label>
                </fieldset>
            </form>
            <button className='profile__button' onClick={enableForm}>Редактировать</button>
            <Link className='profile__link link' to={endpointMain}>Выйти из аккаунта</Link>
        </section>
    )
}
