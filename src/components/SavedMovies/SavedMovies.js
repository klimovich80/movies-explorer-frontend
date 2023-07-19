import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ isShort, setShortMovies, savedMovies, setSavedMovies }) {
    return (
        <section className='saved-movies movies'>
            <SearchForm isShort={isShort} setShortMovies={setShortMovies} />
            <MoviesCardList savedMovies={true} />
        </section>
    )
}
