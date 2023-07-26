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
    savedMovie,
    handleSavedMovies,
    filterShortMovies
}) {
    return (<section className='movies'>
        <SearchForm
            searchMovie={searchMovie}
            searchInput={searchInput}
            isShort={isShort}
            setShort={setShort}
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
            savedMovie={savedMovie}
        />
    </section>
    )
}
