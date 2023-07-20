import './MoviesCard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FILM_IMAGES_SERVER_URL } from '../../utils/config';

export default function MoviesCard({
    isSavedMovies,
    handleSavedMovies,
    movie
}) {
    const [isSaved, setSaved] = useState(false)

    function toggleCardSaved() {
        isSaved
            ? setSaved(false)
            : setSaved(true);
    }

    function handleClick() {
        console.log('handling click');
        isSavedMovies
            ? handleSavedMovies(movie, true)
            : handleSavedMovies(movie, false)
    }

    const buttonText = isSavedMovies ? '' : isSaved ? '' : 'Сохранить';
    const trailerLink = movie.trailerLink;
    const title = movie.nameRU;
    const duration = (`
    ${Math.floor(movie.duration / 60)}ч 
    ${movie.duration % 60}м`);
    const imageLink = FILM_IMAGES_SERVER_URL + movie.image.url;

    return (
        <div className="card" >
            <Link
                className='card__link link'
                to={trailerLink}
                target='_blank'>
                <img
                    className="card__image"
                    src={imageLink}
                    alt={`постер "${title}"`} />
            </Link>
            <button className={
                isSavedMovies
                    ? 'card__button saved-movie'
                    : isSaved
                        ? 'card__button saved'
                        : 'card__button'
            } onClick={handleClick
                // isSavedMovies
                //     ? handleClick()
                //     : toggleCardSaved
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
