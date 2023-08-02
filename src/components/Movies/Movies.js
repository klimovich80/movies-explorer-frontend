import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

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
    filterShortMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {
    return (<section className='movies'>
        <SearchForm
            isShort={isShort}
            setShort={setShort}
            searchMovie={searchMovie}
            searchInput={searchInput}
            setSavedMovies={setSavedMovies}
        />
        <MoviesCardList
            currentUser={currentUser}
            isSavedMovies={false}
            isLoading={isLoading}
            movies={
                isShort
                    ? filterShortMovies(movies)
                    : movies
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
