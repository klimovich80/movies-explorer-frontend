import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies({ isShort, setShort, isSavedMovie, setSavedMovie }) {
    return (
        <section className='movies'>
            <SearchForm isShort={isShort} setShort={setShort} />
            <MoviesCardList isSavedMovies={false} />
        </section>
    )
}
