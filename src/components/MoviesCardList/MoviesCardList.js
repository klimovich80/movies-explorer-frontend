import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {
    return (
        <section className='movies-card'>
            <ul className='movies-card__list list'>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
                <li className='movies-card__item'>
                    <MoviesCard />
                </li>
            </ul>
            <button className='movies-card__button' type='button'>Eщё</button>
        </section>
    )
}
