import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';

export default function SavedMovies({
    currentUser,
    searchMovie,
    isLoading,
    savedMovies,
    movies,
    setSavedMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {
    const isSavedMoviesPage = true;
    useEffect(() => {
        console.log('saved movies page use effect');
    })

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
