import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';

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
    const [formValue, setFormValue] = useState('')
    return (
        <section className='saved-movies movies'>
            <SearchForm
                searchMovie={searchMovie}
                isSavedMoviesPage={isSavedMoviesPage}
                movies={savedMovies}
                setFormValue={setFormValue}
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
                searchMovie={searchMovie}
                formValue={formValue}
            />
        </section>
    )
}
