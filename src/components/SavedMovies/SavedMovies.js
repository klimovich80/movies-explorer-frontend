import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    isShort,
    setShort,
    searchMovie,
    searchInput,
    isLoading,
    savedMovies,
    savedMovie,
    handleSavedMovies,
    filterShortMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {
    return (
        <section className='saved-movies movies'>
            <SearchForm
                searchMovie={searchMovie}
                searchInput={searchInput}
                isShort={isShort}
                setShort={setShort}
            />
            <MoviesCardList
                isSavedMovies={true}
                isLoading={isLoading}
                movies={
                    isShort
                        ? filterShortMovies(savedMovies)
                        : savedMovies
                }
                savedMovie={savedMovie}
                handleSavedMovies={handleSavedMovies}
                maxMovies={maxMovies}
                setMaxMovies={setMaxMovies}
                showMore={showMore}
                connectionError={connectionError}
            />
        </section>
    )
}
