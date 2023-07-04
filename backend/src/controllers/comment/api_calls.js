const axios = require('axios');
require('dotenv').config()

const rapidApiKey = process.env.RAPID_API_KEY
const rapidApiKeyB = process.env.RAPID_API_KEY_B

const fetchCommentsRequestA = async ({ videoId, pageToken = false, order = 'relevance' }) => {
    // https://rapidapi.com/Glavier/api/youtube-v311

    var paramz = {
        part: 'snippet',
        videoId: videoId,
        maxResults: '10',
        order: order,
        textFormat: 'html'
    }
    if (pageToken) { paramz.pageToken = pageToken }
    console.log("fetchCommentsOfVideo called", videoId, pageToken, order, "paramz", paramz)
    const options = {
        method: 'GET',
        url: 'https://youtube-v311.p.rapidapi.com/commentThreads/',
        params: paramz,
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data
        // console.log(response.data);
    } catch (err) {
        console.error("error fetchCommentsOfVideo", err);
        // throw(err)
    }
}

const fetchCommentsRequestB = async ({ videoId, pageToken = false, order = 'relevance' }) => {
    // https://rapidapi.com/ytdlfree/api/youtube-v3-alternative

    var paramz = {
        // part: 'snippet',
        id: videoId,
        // maxResults: '10',
        sort_by: 'top'
    }
    if (pageToken) { paramz.token = pageToken }
    if (order == 'newest') { paramz.sort_by = 'newest'}
    console.log("fetchCommentsOfVideo called", videoId, pageToken, order, "paramz", paramz)
    const options = {
        method: 'GET',
        // url: 'https://youtube-v3-alternative.p.rapidapi.com/comments',
        url: 'https://yt-api.p.rapidapi.com/comments',
        params: paramz,
        headers: {
            'X-RapidAPI-Key': rapidApiKeyB,
            //'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
            'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data
        // console.log(response.data);
    } catch (err) {
        console.error("error fetchCommentsOfVideo", err);
        // throw(err)
    }
}

module.exports = {fetchCommentsRequestA, fetchCommentsRequestB}