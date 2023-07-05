import React from 'react'
import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList'
import MoviesCard from '../MoviesCard'

export default function SavedMovies() {
    return (
        <section className='saved-movies'>
            <MoviesCardList />
            <MoviesCard />
        </section>
    )
}
