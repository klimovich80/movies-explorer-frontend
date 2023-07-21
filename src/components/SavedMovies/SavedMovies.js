import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    isShort,
    setShortMovies,
    savedMovies,
    handleSavedMovies }) {
    return (
        <section className='saved-movies movies'>
            <SearchForm
                isShort={isShort}
                setShortMovies={setShortMovies} />
            <MoviesCardList
                isSavedMovies={true}
                movies={savedMovies}
                handleSavedMovies={handleSavedMovies} />
        </section>
    )
}
