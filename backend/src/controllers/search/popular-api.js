//  https://rapidapi.com/genapi/api/youtube-v3-lite

const axios = require('axios');
require('dotenv').config()

const rapidApiKeyA = process.env.RAPID_API_KEY
const rapidApiKeyB = process.env.RAPID_API_KEY_B

const fetchPopularVideos = async ( {regionCode} ) => {
    const regCode = regionCode ? regionCode : "VN"
    console.log("fetchPopularVideos regCode", regCode)
    const options = {
        method: 'GET',
        url: 'https://youtube-v3-lite.p.rapidapi.com/videos',
        params: {
          chart: 'mostPopular',
          regionCode: regCode,
          part: 'id,snippet'
        },
        headers: {
          'X-RapidAPI-Key': rapidApiKeyB,
          'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com'
        }
      };


    try {
        const response = await axios.request(options);
        console.log
        return (response.data);
    } catch (error) {
        throw(error)
    }
}

module.exports = {fetchPopularVideos}
