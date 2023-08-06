import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import MyInput from '../UI/MyInput/MyInput'
import { useEffect } from 'react'
import { useFormWithValidation } from '../hooks/useForm'

export default function SearchForm({
    searchMovie,
    searchInput,
    isSavedMoviesPage,
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
        values.movie = (
            isSavedMoviesPage
                ? ''
                :
                searchInput
        );
        errors.movie = '';
        searchMovie(isSavedMoviesPage, values.movie);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        searchMovie(isSavedMoviesPage, values.movie);
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
                    searchMovie={searchMovie}
                    inputValue={values.movie}
                    isSavedMoviesPage={isSavedMoviesPage}
                />
            </form>
        </section>
    )
}