import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    isShort,
    setShort,
    searchMovie,
    searchInput,
    setShortMovies,
    isLoading,
    savedMovies,
    savedMovie,
    handleSavedMovies,
    filterShortMovies,
    maxMovies,
    setMaxMovies,
    showMore
}) {
    return (
        <section className='saved-movies movies'>
            <SearchForm
                searchMovie={searchMovie}
                searchInput={searchInput}
                setShortMovies={setShortMovies}
                isShort={isShort}
                setShort={setShort}
            />
            <MoviesCardList
                isLoading={isLoading}
                isSavedMovies={true}
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
            />
        </section>
    )
}
