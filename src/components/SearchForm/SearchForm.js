import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import MyInput from '../UI/MyInput/MyInput'
import { useEffect } from 'react'
import { useFormWithValidation } from '../hooks/useForm'

export default function SearchForm({
    isShort,
    setShort,
    searchMovie,
    searchInput,
}) {

    const buttonText = 'Поиск';

    const {
        values,
        errors,
        handleChange,
        isValid
    } = useFormWithValidation({
        movie: '',
        isValid: true
    });

    useEffect(() => {
        console.log('search button use effect');
        values.movie = (searchInput);
        errors.movie = '';
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        searchMovie(values.movie);
    }

    return (
        <section className='search'>
            <form className='search__form'>
                <div className='search__container'>
                    <MyInput
                        id='search__movie'
                        name="movie"
                        error={errors.movie && 'Нужно ввести ключевое слово'}
                        type='search'
                        required
                        minLength="1"
                        maxLength="50"
                        placeholder='Фильм'
                        value={values.movie}
                        onChange={handleChange}
                    />
                    <button
                        className={
                            isValid
                                ? 'search__button button'
                                : 'search__button search__button_disabled button'
                        }
                        type='submit'
                        aria-label={buttonText}
                        disabled={!isValid}
                        onClick={handleSubmit}
                    >
                        {buttonText}
                    </button>
                </div>
                <FilterCheckbox
                    isShort={isShort}
                    setShort={setShort}
                />
            </form>
        </section>
    )
}