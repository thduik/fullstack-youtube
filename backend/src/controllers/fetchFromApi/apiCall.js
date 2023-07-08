const axios = require('axios')
const BASE_URL = 'https://youtube-v31.p.rapidapi.com' //'https://youtube-v3-alternative.p.rapidapi.com' // 'https://youtube-v31.p.rapidapi.com';
require('dotenv').config()

const options = {
  params: {
    maxResults: 10,
  },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

const fetchFromAPI = async (url) => {

  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log("fetchFromAPI success url is", url, "data is", data )
    return data;
  } catch(err) {
    throw(err)
  }
};

module.exports = {fetchFromAPI}