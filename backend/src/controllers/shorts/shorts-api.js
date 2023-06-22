//  https://rapidapi.com/Glavier/api/youtube138
const axios = require('axios');
require('dotenv').config()

const rapidApiKey = process.env.RAPID_API_KEY
const fetchShortsOfChannelA = async ({ channelId,cursorNext }) => {
    if (!channelId) { console.log('no channelId');return}
    let paramz = {
        id: channelId,
        filter: 'shorts_latest',
        hl: 'en',
        gl: 'US'
    }
    if (cursorNext) {paramz.cursorNext = cursorNext}
    console.log("fetchShortsOfChannelA paramz is", paramz)
    const options = {
        method: 'GET',
        url: 'https://youtube138.p.rapidapi.com/channel/videos/',
        params: paramz,
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return (response.data)
    } catch (error) {
        console.error(error);
    }
}

module.exports = {fetchShortsOfChannelA}