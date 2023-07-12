import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function Movies({ isShort, setShortMovies }) {
    return (
        <section className='movies'>
            {/* Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox. */}
            <SearchForm isShort={isShort} setShortMovies={setShortMovies} />
            <MoviesCardList />
            <MoviesCard />
        </section>
    )
}
