const axios = require('axios');

const CLIENT_ID = '72aE7VADNpqG9TZP9PJGiH5GnzzNwAuFKOfA4ZiZOL0rYuyb';
const CLIENT_SECRET = 'IoY2IzjyK8f375rtbfEkykpUIxkyR21Jz7TZcYDJ5V64SKCUTA5ZXGd5OmaxV9nj';

const SCOPE = '';// do not have api authorized yet

async function getTokenHeader() {
  const tokenUrl = 'https://gw.api.it.umich.edu/um/oauth2/token';
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      `${tokenUrl}?grant_type=client_credentials&scope=${SCOPE}`,
      {}, // Body 为空
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      }
    );
    console.log('Token:', response.data.access_token);
  } catch (error) {
    console.error('Error getting token:', error.response ? error.response.data : error.message);
  }
}

async function getTokenBody() {
  const tokenUrl = 'https://gw.api.it.umich.edu/um/oauth2/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('scope', SCOPE);
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  try {
    const response = await axios.post(tokenUrl, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Token:', response.data.access_token);
  } catch (error) {
    console.error('Error getting token:', error.response ? error.response.data : error.message);
  }
}

module.exports = { getTokenHeader, getTokenBody };