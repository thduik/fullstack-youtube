

const axios = require('axios');
require('dotenv').config()
const rapidApiKeyA = process.env.RAPID_API_KEY

// const options = {
//   method: 'GET',
//   url: 'https://bing-autosuggest1.p.rapidapi.com/suggestions',
//   params: {
//     q: 'zach ',
//     cc: 'VN'
//   },
//   headers: {
//     'X-BingApis-SDK': 'true',
//     'X-RapidAPI-Key': rapidApiKeyA,
//     'X-RapidAPI-Host': 'bing-autosuggest1.p.rapidapi.com'
//   }
// };


const fetchAutoCompleteSuggestions = async ({keyword}) => {
    const paramz =  {
        q: keyword,
        cc: 'VN'
      }
    const options = {
        method: 'GET',
        url: 'https://bing-autosuggest1.p.rapidapi.com/suggestions',
        params: paramz,
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': rapidApiKeyA,
          'X-RapidAPI-Host': 'bing-autosuggest1.p.rapidapi.com'
        }
      };
    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

module.exports = {fetchAutoCompleteSuggestions}