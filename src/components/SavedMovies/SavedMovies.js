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
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {
    const isSavedMoviesPage = true;
    return (
        <section className='saved-movies movies'>
            <SearchForm
                searchMovie={searchMovie}
                searchInput={searchInput}
                isShort={isShort}
                setShort={setShort}
                isSavedMoviesPage={isSavedMoviesPage}
                movies={savedMovies}
            />
            <MoviesCardList
                currentUser={currentUser}
                isSavedMoviesPage={isSavedMoviesPage}
                isLoading={isLoading}
                movies={savedMovies}
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
