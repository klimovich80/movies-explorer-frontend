import './MoviesCard.css'
import cardImage from '../../images/movie-pic.jpg'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function MoviesCard({ savedMovies, deleteFromSaved, cardLink }) {
    const [isSaved, setSaved] = useState(false)

    function toggleCardSaved() {
        isSaved ? setSaved(false) : setSaved(true);
    }

    const buttonText = savedMovies ? '' : isSaved ? '' : 'Сохранить';

    return (
        <div className="card" >
            <Link className='card__link link' to={cardLink}>
                <img className="card__image" src={cardImage} alt='кинокартинка' />
            </Link>
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
            }
                aria-label={buttonText}>
                {buttonText}
            </button>
            <div className='card__footer'>
                <p className='card__title'>33 слова о дизайне</p>
                <p className='card__duration'>1ч 17м</p>
            </div>
        </div>
    )
}
