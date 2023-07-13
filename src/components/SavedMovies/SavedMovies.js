import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ isShort, setShortMovies, savedMovies, deleteFromSaved }) {
    return (
        <section className='saved-movies movies'>
            <SearchForm isShort={isShort} setShortMovies={setShortMovies} />
            <MoviesCardList savedMovies={savedMovies} deleteFromSaved={deleteFromSaved} />
        </section>
    )
}
