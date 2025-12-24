const BASE_URL = 'http://localhost:5000/api';

async function post(path, body) {
    const response = await fetch(BASE_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const result = await response.json();

    if (!response.ok) {
        throw { response: { data: result } };
    }

    return { data: result };
}

async function get(path) {
    const response = await fetch(BASE_URL + path);
    const result = await response.json();

    if (!response.ok) {
        throw { response: { data: result } };
    }

    return { data: result };
}


async function upload(path, formData) {
    const response = await fetch(BASE_URL + path, {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (!response.ok) {
        throw { response: { data: result } };
    }

    return { data: result };
}

const api = { post, get, upload };
export default api;

