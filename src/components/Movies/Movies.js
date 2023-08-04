import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { useEffect } from 'react'

export default function Movies({
    currentUser,
    isShort,
    setShort,
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
        const name = localStorage.getItem('searchInput')
        console.log(name);
        //searchMovie(false, name)
    })
    return (<section className='movies'>
        <SearchForm
            isShort={isShort}
            setShort={setShort}
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
