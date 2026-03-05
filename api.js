const axios = require('axios');
const { getAccessToken } = require('./auth');

const BASE_URL = 'https://my.pressable.com/v1';

async function request(method, path, data = null, params = null) {
    const token = await getAccessToken();

    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${path}`,
            data,
            params,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        const status = error.response ? error.response.status : 'UNKNOWN';
        const message = error.response ? JSON.stringify(error.response.data) : error.message;
        throw new Error(`Pressable API Error (${status}): ${message}`);
    }
}

module.exports = {
    get: (path, params) => request('GET', path, null, params),
    post: (path, data) => request('POST', path, data),
    put: (path, data) => request('PUT', path, data),
    delete: (path) => request('DELETE', path)
};
