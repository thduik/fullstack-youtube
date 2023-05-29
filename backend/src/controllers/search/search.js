const axios = require('axios')
require('dotenv').config()

const searchVideos = async (req, res, next) => {
    const keyword = req.query.q
    try {
        const result = await testSearchYoutube(keyword)
        console.log("searchVideos success, res.items[0]:", result.items[0])
        res.json(result.items)
    } catch (err) {
        console.log("searchVideos error", err)
        res.status(403).send("FUCK YOU")
    }
}

const testSearchYoutube = async (keyword = "surfing", resultType = "video") => {
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

module.exports = {searchVideos}