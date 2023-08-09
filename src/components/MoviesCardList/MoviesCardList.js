import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { mainApi } from '../../utils/MainApi';
import { useEffect } from 'react';

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
    useEffect(() => {
        console.log(`card list use effect`);
    }, [])

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
    console.log(`movies quantity: "${movies.length}"`);
    console.log(`showMovies quantity: "${showMovies.length}"`);
    console.log(`значение поля: '${formValue}'`);



    const Cards = () => {
        return <ul className='movies-card__list list'>
            {showMovies.map(movie => (
                <li
                    className='movies-card__item'
                    key={
                        movie._id
                            ? movie._id
                            : movie.id
                    }>
                    <MoviesCard
                        isSavedMoviesPage={isSavedMoviesPage}
                        movie={movie}
                        isSavedMovie={isSavedMovie}
                        addToList={addToList}
                        deleteFromList={deleteFromList}
                    />
                </li>))}
        </ul>
    }

    // const MoreButton = () => {
    //     //  если размер массива показываемых фильмов больше 3 и меньше рамзера массива фильмов
    //     return showMovies.length > 3 && showMovies.length < movies.length
    //         // соответсвует условию
    //         // если не пустая строка
    //         ? !isEmpty
    //             //не пустая - показать кнопку 
    //             ? <button
    //                 className='movies-card__button'
    //                 aria-label='Eщё'
    //                 type='button'
    //                 onClick={handleMoreClick}
    //             >Eщё</button>
    //             //пустая - скрыть кнопку
    //             : <></>
    //         // не соответсвует условию - скрыть кнопку
    //         : <></>
    // }

    const MoreButton = () => {
        //  если размер массива показываемых фильмов больше 3 и меньше рамзера массива фильмов
        return showMovies.length > 3 && showMovies.length < movies.length
            // соответсвует условию
            // если не пустая строка
            ? <button
                className='movies-card__button'
                aria-label='Eщё'
                type='button'
                onClick={handleMoreClick}
            >Eщё</button>
            // не соответсвует условию - скрыть кнопку
            : <></>
    }
    //----------------------------------------------------------------------
    return (
        <section className='movies-card' >
            {
                //если есть ошибка подключения
                connectionError
                    // пишем пользователю
                    ? <p className='movies-card__not-found'>
                        Во время запроса произошла ошибка.
                        Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз
                    </p>
                    // иначе грузим
                    : isLoading
                        // еще не загрузили - показываем прелоадер
                        ? <Preloader />
                        // загрузили, смотрим не пустой ли результат
                        // был ли поиск?
                        : isSearched
                            // да был
                            // пустая ли строка
                            ? isEmpty
                                // да пустая
                                // сохраненка?
                                ? isSavedMoviesPage
                                    // да сохраненка
                                    ? <>
                                        <p>показать все(savedMovies, был поиск в локалке, пустая строка)</p>
                                        {Cards()}
                                        {MoreButton()}
                                    </>
                                    // нет не сохраненка
                                    : <p className='movies-card__not-found'>ничего не найдено...(movies, был поиск в локалке, пустая строка )</p>
                                // нет не пустая
                                //есть ли результат поиска?
                                : showMovies.length > 0
                                    ? <>
                                        <p>Показать результат(не пустая строка)</p>
                                        {Cards()}
                                        {MoreButton()}
                                    </>
                                    : <p className='movies-card__not-found'>ничего не найдено...(результат поиска)</p>

                            // нет не было
                            // сохраненка
                            : isSavedMoviesPage
                                // да сохраненка
                                //пустая ли строка формы?
                                ? formValue === ''
                                    // да, пустая. Показать все
                                    ? <>
                                        <p>показать все(savedMovies, поиска не было в локалке, пустая строка)</p>
                                        {Cards()}
                                        {MoreButton()}
                                    </>
                                    // нет не пустая - показать результат поиска
                                    //есть ли результат поиска?
                                    : showMovies.length > 0
                                        ? <>
                                            <p>показать результат поиска(savedMovies, поиска не было в локалке, не пустая строка)</p>
                                            {Cards()}
                                            {MoreButton()}
                                        </>
                                        : <p className='movies-card__not-found'>ничего не найдено...(результат поиска поиска не было в локалке, не пустая строка)</p>
                                // нет не сохраненка
                                : <p>не показывать ничего(поиска не было)</p>
            }
        </section>
    )
}