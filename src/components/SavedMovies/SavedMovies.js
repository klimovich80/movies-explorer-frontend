import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    currentUser,
    searchMovie,
    isLoading,
    isSavedMoviesShort,
    setSavedMoviesShort,
    savedMovies,
    movies,
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
                isSavedMoviesPage={isSavedMoviesPage}
                movies={savedMovies}
            />
            <MoviesCardList
                currentUser={currentUser}
                isSavedMoviesPage={isSavedMoviesPage}
                isLoading={isLoading}
                movies={movies}
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
