import { filmApiLink } from "./config";

class MoviesApi {
    constructor(config) {
        this._url = config.url;
    }

    _request() {
        return fetch(this._url).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //Movies methods
    getMovies() {
        return this._request();
    }
}

export const moviesApi = new MoviesApi({
    url: filmApiLink,
});