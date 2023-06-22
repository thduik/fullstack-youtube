// https://rapidapi.com/Glavier/api/youtube-v311

const axios = require('axios');
require('dotenv').config()

const rapidApiKey = process.env.RAPID_API_KEY
const fetchCommentsOfVideo = async ({ videoId, pageToken = false, order = 'relevance' }) => {

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

const fetchCommentsOfParentThread = async ({ parentId, pageToken }) => { //child comments of parent commentThread
    var paramz = {
        part: 'snippet',
        parentId: parentId,
        maxResults: '10',
        textFormat: 'html'
    }
    const options = {
        method: 'GET',
        url: 'https://youtube-v311.p.rapidapi.com/comments/',
        params: paramz,
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return (response.data);
    } catch (error) {
        console.error(error);
        throw (error)

    }

}

module.exports = { fetchCommentsOfVideo, fetchCommentsOfParentThread }