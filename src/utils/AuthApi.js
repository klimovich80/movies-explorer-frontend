import { MAIN_API_URL } from './config';

const sendRequest = (url, method, body, token) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${MAIN_API_URL}${url}`, options).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} -> ${res.statusText}!`);
    });
};

export const register = (email, password, name) => {
    console.log(email, password, name);
    return sendRequest("/signup", "POST", { email, password, name });
};

export const login = (password, email) => {
    return sendRequest("/signin", "POST", { password, email });
};

export const getUserInfo = (token) => {
    return sendRequest("/users/me", "GET", null, token);
};
// TODO check if it is neccesary
export const getMovies = (token) => {
    return sendRequest("/movies", "GET", null, token);
}