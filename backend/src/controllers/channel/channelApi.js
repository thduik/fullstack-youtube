const axios = require('axios')
require('dotenv').config()
const apiKey = process.env.YOUTUBE_API_KEY
const fetchChannelDetails = async ({channelId}) => {
    //resultType can be "channel", "playlist" or "video"
    try {
        if (!channelId) {throw("no channelId")}

        var searchUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&maxResults=10&id=${channelId}&key=${apiKey}`
        console.log("fetchChannelDetails searchUrl", searchUrl)
        const res = await axios.get(searchUrl
            , {}, {
            headers: {
                // Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        }
        )
        return res.data

    } catch (err) {
        throw ("err testSearchYoutube", err)
    }

}

module.exports = { fetchChannelDetails };