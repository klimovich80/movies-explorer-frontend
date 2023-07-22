import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'

export default function Movies({
    searchMovie,
    isShort,
    setShortMovies,
    isLoading,
    movies,
    savedMovie,
    handleSavedMovies,
}) {
    return (<section className='movies'>
        <SearchForm
            searchMovie={searchMovie}
            isShort={isShort}
            setShortMovies={setShortMovies}
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
