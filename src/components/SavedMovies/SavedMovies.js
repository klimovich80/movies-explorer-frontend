import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function SavedMovies() {
    return (
        <section className='saved-movies'>
            <MoviesCardList />
            <MoviesCard />
        </section>
    )
}
