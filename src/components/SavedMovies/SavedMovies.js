import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function SavedMovies() {
    return (
        <section className='saved-movies'>
            <MoviesCardList />
            <MoviesCard />
        </section>
    )
}
