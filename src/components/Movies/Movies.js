import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies({
    isShort,
    setShort,
    isLoading,
    movies,
    setSavedMovies
}) {
    console.log(movies[0]);
    return (
        <section className='movies'>
            <SearchForm isShort={isShort} setShort={setShort} />
            <MoviesCardList
                isSavedMovies={false}
                setSavedMovies={setSavedMovies}
                isLoading={isLoading}
                movies={movies}
            />
        </section>
    )
}
