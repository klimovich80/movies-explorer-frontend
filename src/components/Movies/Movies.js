import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { useEffect } from 'react'

export default function Movies({
    currentUser,
    searchMovie,
    isLoading,
    searchInput,
    movies,
    setSavedMovies,
    savedMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {

    useEffect(() => {
        const name = localStorage.getItem('searchInput') || ''
        console.log(name);
    })
    return (<section className='movies'>
        <SearchForm
            searchMovie={searchMovie}
            searchInput={searchInput}
            movies={movies}
        />
        <MoviesCardList
            currentUser={currentUser}
            isSavedMoviesPage={false}
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
