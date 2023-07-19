import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({ savedMovies, isLoading }) {
    return (
        <section className='movies-card'>
            {isLoading
                ? <Preloader />
                : <ul className='movies-card__list list'>
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
            }

            <button className='movies-card__button' aria-label='Eщё' type='button'>Eщё</button>
        </section>
    )
}
