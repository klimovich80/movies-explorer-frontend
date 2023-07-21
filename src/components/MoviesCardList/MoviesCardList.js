import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({
    isSavedMovies,
    handleSavedMovies,
    isLoading,
    movies,
    savedMovie
}) {
    return (
        movies.length === 0
            ? <p>No movies found!</p>
            :
            <section className='movies-card'>
                {isLoading
                    ? <Preloader />
                    : <ul className='movies-card__list list'>
                        {movies.map(movie => (
                            <li className='movies-card__item' key={
                                movie._id
                                    ? movie._id
                                    : movie.id
                            }>
                                <MoviesCard
                                    isSavedMovies={isSavedMovies}
                                    handleSavedMovies={handleSavedMovies}
                                    movie={movie}
                                    savedMovie={savedMovie}
                                />
                            </li>))}
                    </ul>
                }
                <button className='movies-card__button' aria-label='Eщё' type='button'>Eщё</button>
            </section>
    )
}
