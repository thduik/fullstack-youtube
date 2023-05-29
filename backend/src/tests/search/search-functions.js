

const axios = require('axios')
const { mockUserId, mockPlaylistName, mockUsername } = require('../data')

require('dotenv').config()

const baseUrl = 'http://localhost:4444/'

const testSearch = async (keyword) => {

    const playlistid = playlistData._id
    const searchUrl = baseUrl + `/youtube/search/?q=${keyword}&limit=5`
    const res = await axios.get(searchUrl)
    console.log("testSearch success docid is", res.data)
    return res.data

}

const testSearchYoutube = async (keyword="surfing", resultType="video") => {
    //resultType can be "channel", "playlist" or "video"
    try {
        console.log("process.env.YOUTUBE_API_KEY", process.env.YOUTUBE_API_KEY)
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=${process.env.YOUTUBE_API_KEY}&type=${resultType}`
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

module.exports = { testSearch, testSearchYoutube }