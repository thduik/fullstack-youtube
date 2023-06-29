

const axios = require('axios')

require('dotenv').config()

const baseUrl = 'http://localhost:4444'

const testSearch = async (keyword="lol") => {
    
    
}

const testSearchYoutube = async (keyword="surfing", resultType="video") => {
    //resultType can be "channel", "playlist" or "video"
    try {
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