import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({
    isSavedMovies,
    handleSavedMovies,
    isLoading,
    movies,
    savedMovie,
    maxMovies,
    setMaxMovies,
    showMore
}) {
    function handleMoreClick() {
        setMaxMovies(maxMovies + showMore);
    }
    console.log(movies);
    const showMovies = movies.slice(0, maxMovies)
    return (
        <section className='movies-card' >
            {
                isLoading
                    ? <Preloader />
                    : showMovies.length === 0
                        ? <p className='movies-card__not-found'>Ничего не найдено</p>
                        : <ul className='movies-card__list list'>
                            {showMovies.map(movie => (
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
            {
                showMovies.length > 3 && showMovies.length < movies.length
                    ? <button
                        className='movies-card__button'
                        aria-label='Eщё'
                        type='button'
                        onClick={handleMoreClick}
                    >Eщё</button>
                    : <></>
            }
        </section >
    )
}
