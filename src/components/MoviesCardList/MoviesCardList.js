import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { mainApi } from '../../utils/MainApi';

export default function MoviesCardList({
    currentUser,
    isSavedMoviesPage,
    isLoading,
    movies,
    setSavedMovies,
    savedMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError,
    formValue
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

    // определяем пуста ли строка ввода
    let isEmpty = isSavedMoviesPage
        // смотрим в поле формы если мы на странице сохраненных фильмов
        ? formValue === ''
        // иначе берем значение из локального хранилища
        : localStorage.getItem('searchInput') === ''

    // смотрим в локальное хранилище, определяем был ли поиск 
    const isSearched = localStorage.getItem('searchInput') !== null;

    // устанавливаем количество фильмов к показу
    let showMovies = movies.slice(0, maxMovies);
    //----------------------------------------------------------------------
    return (
        // был ли поиск?
        isSearched
            // да был
            // пустая ли строка
            ? isEmpty
                // да пустая
                // сохраненка?
                ? isSavedMoviesPage
                    // да сохраненка
                    ? <p>показать все(savedMovies, был поиск, пустая строка)</p>
                    // нет не сохраненка
                    : <p>ничего не найдено...(movies, был поиск, пустая строка )</p>
                // нет не пустая
                //есть ли результат поиска?
                : showMovies.length > 0
                    ? <p>Показать результат(не пустая строка)</p>
                    : <p>ничего не найдено...(результат поиска)</p>

            // нет не было
            // сохраненка
            : isSavedMoviesPage
                // да сохраненка
                ? <p>показать все(savedMovies, поиска не было)</p>
                // нет не сохраненка
                : <p>не показывать ничего(поиска не было)</p>
    )
}

//     return (
//         <section className='movies-card' >
//             {
//                 //если есть ошибка подключения
//                 connectionError
//                     // пишем пользователю
//                     ? <p className='movies-card__not-found'>
//                         Во время запроса произошла ошибка.
//                         Возможно, проблема с соединением или сервер недоступен.
//                         Подождите немного и попробуйте ещё раз
//                     </p>
//                     // иначе грузим
//                     : isLoading
//                         // еще не загрузили - показываем прелоадер
//                         ? <Preloader />
//                         // загрузили, смотрим не пустой ли результат
//                         : isEmptyValue
//                             //пустой - смотрим результат это поиска или перезагрузки
//                             //если поиска был значение длины будет присутсвовать
//                             ? isSearched.length
//                                 // покажем пользователю, что ничего не нашли
//                                 ? <p className='movies-card__not-found'>Ничего не найдено</p>
//                                 // это был результат не поиска - прячем ошибку(для фильмов)
//                                 : <></>
//                             // что-то нашли - отображаем результат
//                             : <ul className='movies-card__list list'>
//                                 {showMovies.map(movie => (
//                                     <li
//                                         className='movies-card__item'
//                                         key={
//                                             movie._id
//                                                 ? movie._id
//                                                 : movie.id
//                                         }>
//                                         <MoviesCard
//                                             isSavedMoviesPage={isSavedMoviesPage}
//                                             movie={movie}
//                                             isSavedMovie={isSavedMovie}
//                                             addToList={addToList}
//                                             deleteFromList={deleteFromList}
//                                         />
//                                     </li>))}
//                             </ul>
//             }
//             {
//                 showMovies.length > 3 && showMovies.length < movies.length
//                     ? !isEmpty
//                         ? <button
//                             className='movies-card__button'
//                             aria-label='Eщё'
//                             type='button'
//                             onClick={handleMoreClick}
//                         >Eщё</button>
//                         : <></>
//                     : <></>
//             }
//         </section >
//     )
// }
