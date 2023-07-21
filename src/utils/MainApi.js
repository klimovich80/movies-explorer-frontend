import { MAIN_API_URL } from "./config";

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
    getInitialCards(token) {
        return this._request(`/movies`, token);
    }

    postNewCard(movie, token) {
        return this._request(`/post`, token, "POST", movie);
    }
    // delete movie to saved
    deleteMovie(id, token) {
        return this._request(`/movies/${id}`, token, "DELETE");
    }
    // add movie from saved
    addMovie(id, token) {
        return this._request(`/movies/${id}/`, token, "PUT");
    }

    setLikeStatus(id, isLiked, token) {
        return isLiked ? this.deleteLike(id, token) : this.addLike(id, token);
    }

    deleteCard(cardId, token) {
        return this._request(`/movies/${cardId}`, token, "DELETE");
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