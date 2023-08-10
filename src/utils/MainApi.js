import { MAIN_API_URL, FILM_IMAGES_SERVER_URL } from "./config";

class MainApi {
    constructor(config) {
        this._baseUrl = `${config.baseUrl}`;
        this._headers = config.headers;
    }

    _request(url, token, method, body) {
        const options = {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        };

        if (method) {
            options.method = method;
        }
        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //Cards methods
    getSavedMovies(token) {
        return this._request(`/movies`, token);
    }

    // add movie from saved
    addMovie({
        country,
        description,
        director,
        duration,
        id,
        image,
        nameRU,
        nameEN,
        trailerLink,
        year
    }, token) {
        return this._request(`/movies`, token, "POST", {
            country,
            description,
            director,
            duration,
            movieId: id,
            image: `${FILM_IMAGES_SERVER_URL + image.url}`,
            nameRU: nameRU || 'нет названия',
            nameEN: nameEN || 'no name',
            trailerLink,
            year,
            thumbnail: `${FILM_IMAGES_SERVER_URL + image.formats.thumbnail.url}`
        });
    }
    // delete movie to saved
    deleteMovie(id, token) {
        return this._request(`/movies/${id}`, token, "DELETE");
    }

    //profile methods
    getProfileInfo(token) {
        return this._request(`/users/me`, token);
    }

    editProfileInfo(name, email, token) {
        return this._request(`/users/me`, token, "PATCH", { name, email });
    }
}

export const mainApi = new MainApi({
    baseUrl: MAIN_API_URL,
});