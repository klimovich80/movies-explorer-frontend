import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    currentUser,
    isShort,
    setShort,
    searchMovie,
    searchInput,
    isLoading,
    savedMovies,
    setSavedMovies,
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
                currentUser={currentUser}
                isSavedMovies={true}
                isLoading={isLoading}
                movies={
                    isShort
                        ? filterShortMovies(savedMovies)
                        : savedMovies
                }
                setSavedMovies={setSavedMovies}
                savedMovies={savedMovies}
                maxMovies={maxMovies}
                setMaxMovies={setMaxMovies}
                showMore={showMore}
                connectionError={connectionError}
            />
        </section>
    )
}
