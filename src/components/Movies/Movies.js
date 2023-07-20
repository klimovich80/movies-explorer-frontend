import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies({
    isShort,
    setShortMovies,
    isLoading,
    movies,
    handleSavedMovies
}) {
    console.log(movies);
    return (
        <section className='movies'>
            <SearchForm
                isShort={isShort}
                setShortMovies={setShortMovies} />
            <MoviesCardList
                isSavedMovies={false}
                handleSavedMovies={handleSavedMovies}
                isLoading={isLoading}
                movies={movies}
            />
        </section>
    )
}
