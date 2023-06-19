const axios = require('axios');
require('dotenv').config()

const fetchCommentsOfVideo = async (videoId, pageToken = false) => {
    console.log("fetchCommentsOfVideo called", videoId, pageToken)
    var paramz = {
        part: 'snippet',
        videoId: videoId,
        maxResults: '20',
        order: 'time',
        textFormat: 'html'
    }
    if (pageToken) {paramz.pageToken = pageToken}
    const options = {
        method: 'GET',
        url: 'https://youtube-v311.p.rapidapi.com/commentThreads/',
        params: paramz,
        headers: {
            'X-RapidAPI-Key': 'e5255cd7e3mshb0fecff923ab3b2p194ad3jsnc5e0bee7fae3',
            // 'X-RapidAPI-Key': process.env.RAPID_API_KEY,
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

module.exports = {fetchCommentsOfVideo}