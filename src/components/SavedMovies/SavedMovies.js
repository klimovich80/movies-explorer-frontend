import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    searchMovie,
    isShort,
    setShortMovies,
    isLoading,
    savedMovies,
    savedMovie,
    handleSavedMovies
}) {
    return (
        <section className='saved-movies movies'>
            <SearchForm
                searchMovie={searchMovie}
                isShort={isShort}
                setShortMovies={setShortMovies} />
            <MoviesCardList
                isLoading={isLoading}
                isSavedMovies={true}
                movies={savedMovies}
                savedMovie={savedMovie}
                handleSavedMovies={handleSavedMovies} />
        </section>
    )
}
