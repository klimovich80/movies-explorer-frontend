import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies({
    searchMovie,
    // isShort,
    setShortMovies,
    isLoading,
    searchInput,
    movies,
    savedMovie,
    handleSavedMovies,
}) {
    return (<section className='movies'>
        <SearchForm
            searchMovie={searchMovie}
            // isShort={isShort}
            setShortMovies={setShortMovies}
            searchInput={searchInput}
        />
        <MoviesCardList
            isSavedMovies={false}
            handleSavedMovies={handleSavedMovies}
            isLoading={isLoading}
            movies={movies}
            savedMovie={savedMovie}
        />
    </section>
    )
}
