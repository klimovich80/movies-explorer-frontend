import './MoviesCard.css'
import { Link } from 'react-router-dom';
import { FILM_IMAGES_SERVER_URL } from '../../utils/config';

export default function MoviesCard({
    // flags wether we are at movies or saved movies mode
    isSavedMovies,
    // handling saving or deleting movies from saved list
    handleSavedMovies,
    // returns recent movie card 
    movie,
    // flags wether recent movie saved
    isSavedMovie
}) {
    // send add/ delete request depending on it's state
    function handleClick() {
        //does request commes from saved-movies page?
        isSavedMovies
            // yes, deleting movie from list
            ? handleSavedMovies(movie, false)
            // no, check if movie already being saved
            : isSavedMovie(movie)
                // yes, delete it from saved list
                ? handleSavedMovies(movie, false)
                // no, add it to save list
                : handleSavedMovies(movie, true)

    }

    const buttonText = isSavedMovies ? '' : isSavedMovie(movie) ? '' : 'Сохранить';
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
                    src={
                        movie.thumbnail
                            ? movie.thumbnail
                            : imageLink
                    }
                    alt={`постер "${title}"`} />
            </Link>
            <button className={
                isSavedMovies
                    ? 'card__button saved-movie'
                    : isSavedMovie(movie)
                        ? 'card__button saved'
                        : 'card__button'
            }
                onClick={handleClick}
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
