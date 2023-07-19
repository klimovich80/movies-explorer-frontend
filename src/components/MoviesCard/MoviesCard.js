import './MoviesCard.css'
import { filmApiLink } from '../../utils/config'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function MoviesCard({
    savedMovies,
    setSavedMovies,
    movie,
    deleteFromSaved,
}) {
    const [isSaved, setSaved] = useState(false)

    function toggleCardSaved() {
        isSaved ? setSaved(false) : setSaved(true);
    }

    const buttonText = savedMovies ? '' : isSaved ? '' : 'Сохранить';
    const trailerLink = movie.trailerLink;
    const title = movie.nameRU;
    const duration = (`
    ${Math.floor(movie.duration / 60)}ч 
    ${movie.duration % 60}м`);
    const imageLink = movie.image.url;

    return (
        <div className="card" >
            <Link className='card__link link' to={trailerLink} target='_blank'>
                <img className="card__image" src={`https://api.nomoreparties.co/${imageLink}`} alt={`картинка "${title}"`} />
            </Link>
            <button className={
                savedMovies
                    ? 'card__button saved-movie'
                    : isSaved
                        ? 'card__button saved'
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
                <p className='card__title'>{title}</p>
                <p className='card__duration'>{duration}</p>
            </div>
        </div>
    )
}
