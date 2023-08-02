import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { mainApi } from '../../utils/MainApi';

export default function MoviesCardList({
    currentUser,
    isSavedMovies,
    isLoading,
    movies,
    setSavedMovies,
    savedMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {

    const token = localStorage.getItem('token');
    function deleteFromList(movie) {
        const movieToDelete = savedMovies.find(
            m => m.owner === currentUser._id && (m.movieId === (movie.id || movie.movieId))
        )
        if (!movieToDelete) return
        mainApi.deleteMovie(movieToDelete._id, token)
            .then((res) => {
                setSavedMovies(savedMovies.filter(m => m._id !== movieToDelete._id))
            })
            .catch(err => {
                console.log(err)
            })
    }

    function addToList(movie) {
        console.log('adding to saved list');
        mainApi.addMovie(movie, token)
            .then((res) => {
                setSavedMovies([res, ...savedMovies])
            })
            .catch(err => console.log(err))
    }


    function isSavedMovie(movie) {
        return savedMovies.some(
            item => item.owner === currentUser._id && movie.id === item.movieId
        )
    }

    function handleMoreClick() {
        setMaxMovies(maxMovies + showMore);
    }

    let showMovies = movies.slice(0, maxMovies)

    return (
        <section className='movies-card' >
            {
                connectionError
                    ? <p className='movies-card__not-found'>
                        Во время запроса произошла ошибка.
                        Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз
                    </p>
                    : isLoading
                        ? <Preloader />
                        : showMovies.length === 0
                            ? <p className='movies-card__not-found'>Ничего не найдено</p>
                            : <ul className='movies-card__list list'>
                                {showMovies.map(movie => (
                                    <li
                                        className='movies-card__item'
                                        key={
                                            movie._id
                                                ? movie._id
                                                : movie.id
                                        }>
                                        <MoviesCard
                                            isSavedMovies={isSavedMovies}
                                            movie={movie}
                                            isSavedMovie={isSavedMovie}
                                            addToList={addToList}
                                            deleteFromList={deleteFromList}
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
