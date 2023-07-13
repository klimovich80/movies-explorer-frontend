import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ savedMovies }) {
    return (
        <section className='movies-card'>
            <ul className='movies-card__list list'>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard savedMovies={savedMovies} />
                </li>
            </ul>
            <button className='movies-card__button' type='button'>Eщё</button>
        </section>
    )
}
