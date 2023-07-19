import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({
    savedMovies,
    setSavedMovies,
    isLoading,
    movies
}) {
    return (
        <section className='movies-card'>
            {isLoading
                ? <Preloader />
                : <ul className='movies-card__list list'>
                    {movies.map(movie => (
                        <li className='movies-card__item' key={movie.id}>
                            <MoviesCard
                                savedMovies={savedMovies}
                                setSavedMovies={setSavedMovies}
                                movie={movie}
                            />
                        </li>))}
                </ul>
            }
            <button className='movies-card__button' aria-label='Eщё' type='button'>Eщё</button>
        </section>
    )
}
