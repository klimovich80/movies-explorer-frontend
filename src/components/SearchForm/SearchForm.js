import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import MyInput from '../UI/MyInput/MyInput'
import { useEffect, useState } from 'react'
import { useFormWithValidation } from '../hooks/useForm'

export default function SearchForm({
    searchMovie,
    searchInput,
    isSavedMoviesPage,
    isSavedMoviesShort,
    setSavedMoviesShort,
    setFormValue,
}) {
    // стэйт для чекбокса
    const [checked, setChecked] = useState(false)
    const buttonText = 'Поиск';

    const {
        values,
        errors,
        handleChange,
        isValid
    } = useFormWithValidation({
        movie: '',
        isValid: false
    });

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        values.movie = (
            isSavedMoviesPage
                ? ''
                : searchInput
        );
        errors.movie = '';
        // if there are movies find them
        const isSearched = JSON.parse(localStorage.getItem('movies')) !== null
        if (isSearched) {
            searchMovie(isSavedMoviesPage, values.movie, checked)
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setSearchValue(values.movie)
        isSavedMoviesPage
            ? setFormValue(values.movie)
            : localStorage.setItem('searchInput', searchValue);
        searchMovie(isSavedMoviesPage, values.movie, checked);
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
                    isSavedMoviesShort={isSavedMoviesShort}
                    setSavedMoviesShort={setSavedMoviesShort}
                    checked={checked}
                    setChecked={setChecked}
                />
            </form>
        </section>
    )
}