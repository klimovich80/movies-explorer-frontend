import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import MyInput from '../UI/MyInput/MyInput'
import { useEffect } from 'react'
import useForm from '../hooks/useForm'

export default function SearchForm({ isShort, setShort }) {

    const buttonText = 'Поиск';

    const { values, errors, handleChange } = useForm({
        movie: ''
    });

    useEffect(() => {
        values.movie = '';
        errors.movie = '';
    }, []);

    const disableButton = errors.movie !== '';

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submitting search form');
        console.log(values);
    }

    return (
        <section className='search'>
            <form className='search__form'>
                <div className='search__container'>
                    <MyInput
                        id='search__movie'
                        name="movie"
                        error={errors.movie}
                        type='search'
                        required
                        minLength="1"
                        maxLength="50"
                        placeholder='Фильм'
                        value={values.name}
                        onChange={handleChange}
                    />
                    <button
                        className={
                            disableButton
                                ? 'search__button search__button_disabled button'
                                : 'search__button button'
                        }
                        type='submit'
                        aria-label={buttonText}
                        disabled={disableButton}
                        onClick={handleSubmit}
                    >
                        {buttonText}
                    </button>
                </div>
                <FilterCheckbox isShort={isShort} setShort={setShort} />
            </form>
        </section>
    )
}
