import './MoviesCard.css'
import cardImage from '../../images/movie-pic.jpg'
import { useState } from 'react'

export default function MoviesCard({ savedMovies, deleteFromSaved }) {
    const [isSaved, setSaved] = useState(false)

    function toggleCardSaved() {
        isSaved ? setSaved(false) : setSaved(true);
    }
    return (
        <div div className="card" >
            <img className="card__image" src={cardImage} alt='кинокартинка' />
            <button className={
                savedMovies
                    ? 'card__button_saved-movie'
                    : isSaved
                        ? 'card__button_saved'
                        : 'card__button'
            } onClick={
                savedMovies
                    ? deleteFromSaved
                    : toggleCardSaved
            }>
                {
                    savedMovies
                        ? ''
                        : isSaved
                            ? ''
                            : 'Сохранить'}
            </button>
            <div className='card__footer'>
                <p className='card__title'>33 слова о дизайне</p>
                <p className='card__duration'>1ч 17м</p>
            </div>
        </div>
    )
}
