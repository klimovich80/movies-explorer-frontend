import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies({
    isShort,
    setShort,
    searchMovie,
    isLoading,
    searchInput,
    movies,
    isSavedMovie,
    handleSavedMovies,
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
        />
        <MoviesCardList
            isSavedMovies={false}
            handleSavedMovies={handleSavedMovies}
            isLoading={isLoading}
            movies={
                isShort
                    ? filterShortMovies(movies)
                    : movies
            }
            isSavedMovie={isSavedMovie}
            maxMovies={maxMovies}
            setMaxMovies={setMaxMovies}
            showMore={showMore}
            connectionError={connectionError}
        />
    </section>
    )
}
