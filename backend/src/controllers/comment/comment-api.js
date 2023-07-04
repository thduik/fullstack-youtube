// https://rapidapi.com/Glavier/api/youtube-v311

const axios = require('axios');
const { fetchCommentsRequestA, fetchCommentsRequestB } = require('./api_calls');
require('dotenv').config()

const rapidApiKey = process.env.RAPID_API_KEY
const rapidApiKeyB = process.env.RAPID_API_KEY_B



const fetchCommentsOfVideo = (dataJson) => {
    return fetchCommentsRequestB(dataJson)

}

const fetchCommentsOfParentThreadB = async ({ videoId, replyToken }) => {
    //https://rapidapi.com/ytjar/api/yt-api
    const paramz = {
        id: videoId,
        token: replyToken
    }
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/comments',
        params: paramz,
        headers: {
            'X-RapidAPI-Key':rapidApiKeyB ,
            'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
    };
    console.log("fetchCommentsOfParentThreadB called paramz", paramz)
    try {
        const response = await axios.request(options);
        return response.data
        // console.log("fetchCommentsOfParentThreadB success",response.data);
    } catch (error) {
        console.error("fetchCommentsOfParentThreadB err",error);
        throw(error)
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

module.exports = { fetchCommentsOfVideo, fetchCommentsOfParentThread, fetchCommentsOfParentThreadB }