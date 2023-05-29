const axios = require('axios')
const { searchVideosWithKeyword } = require('../../youtube-module')
require('dotenv').config()

const searchVideos = async (req, res, next) => {
    const keyword = req.query.q
    try {
        const result = await searchVideosWithKeyword(keyword)
        console.log("searchVideos success, res.items[0]:", result.items[0])
        res.json(result)
    } catch (err) {
        console.log("searchVideos error", err)
        res.status(403).send("FUCK YOU")
    }
}


module.exports = {searchVideos}