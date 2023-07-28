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
    filterShortMovies,
    maxMovies,
    setMaxMovies,
    showMore
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
            savedMovie={savedMovie}
            maxMovies={maxMovies}
            setMaxMovies={setMaxMovies}
            showMore={showMore}
        />
    </section>
    )
}
