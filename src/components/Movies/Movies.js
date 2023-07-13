import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies({ isShort, setShortMovies, savedMovies }) {
    return (
        <section className='movies'>
            <SearchForm isShort={isShort} setShortMovies={setShortMovies} />
            <MoviesCardList savedMovies={savedMovies} />
        </section>
    )
}
