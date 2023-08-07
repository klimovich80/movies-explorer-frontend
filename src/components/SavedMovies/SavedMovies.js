import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

export default function SavedMovies({
    currentUser,
    searchMovie,
    isLoading,
    savedMovies,
    movies,
    setSavedMovies,
    maxMovies,
    setMaxMovies,
    showMore,
    connectionError
}) {
    console.log(`saved savedMovies items:`);
    console.log(savedMovies);
    console.log(`saved movies items`);
    console.log(movies);
    const [items, setItems] = useState([])
    useEffect(() => {
        console.log(`saved movies use effect`);
        setItems(savedMovies);
        console.log('inside use effect items');
        console.log(items);
    }, [])
    const isSavedMoviesPage = true;
    const [formValue, setFormValue] = useState('')
    return (
        <section className='saved-movies movies'>
            <SearchForm
                searchMovie={searchMovie}
                isSavedMoviesPage={isSavedMoviesPage}
                movies={savedMovies}
                setFormValue={setFormValue}
            />
            <MoviesCardList
                currentUser={currentUser}
                isSavedMoviesPage={isSavedMoviesPage}
                isLoading={isLoading}
                movies={
                    items
                        ? items
                        : movies
                }
                setSavedMovies={setSavedMovies}
                savedMovies={savedMovies}
                maxMovies={maxMovies}
                setMaxMovies={setMaxMovies}
                showMore={showMore}
                connectionError={connectionError}
                searchMovie={searchMovie}
                formValue={formValue}
            />
        </section>
    )
}
