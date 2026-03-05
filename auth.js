require('dotenv').config();
const axios = require('axios');

let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is still valid (with 60s buffer)
    if (accessToken && currentTime < tokenExpiry - 60) {
        return accessToken;
    }

    const clientId = process.env.PRESSABLE_CLIENT_ID;
    const clientSecret = process.env.PRESSABLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('PRESSABLE_CLIENT_ID and PRESSABLE_CLIENT_SECRET must be set in .env');
    }

    try {
        const response = await axios.post('https://my.pressable.com/auth/token', {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        accessToken = response.data.access_token;
        tokenExpiry = currentTime + response.data.expires_in;

        return accessToken;
    } catch (error) {
        console.error('Error obtaining Pressable access token:', error.response ? error.response.data : error.message);
        throw new Error('Authentication failed: Unable to obtain access token.');
    }
}

module.exports = { getAccessToken };
