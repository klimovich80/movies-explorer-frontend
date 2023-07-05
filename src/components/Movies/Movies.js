import React from 'react'
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList'
import MoviesCard from '../MoviesCard'

export default function Movies() {
    return (
        <section className='movies'>
            {/* Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox. */}
            <SearchForm />
            <Preloader />
            <MoviesCardList />
            <MoviesCard />
        </section>
    )
}
