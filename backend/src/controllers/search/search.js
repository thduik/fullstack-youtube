const axios = require('axios')
const { searchVideosWithKeyword } = require('../../youtube-module')
const { fetchPopularVideos } = require('./popular-api')
require('dotenv').config()

const searchVideos = async (req, res, next) => {
    const keyword = req.query.q
    const nextPageToken = req.query.nextPageToken
    

    try {
        const result = await searchVideosWithKeyword(keyword, nextPageToken)
        // console.log("searchVideos success, res.items[0]:", result.items[0])
        res.json(result)
    } catch (err) {
        console.log("searchVideos error", err)
        res.status(403).send("FUCK YOU")
    }
}

const getPopularVideos = async (req,res,next) => {
    console.log("getPopularVideo called", req.body)
    const regCode = req.query.regionCode
    try {
        const result = await fetchPopularVideos({regionCode: regCode ? regCode : false})
        console.log("getPopularVideos success", result)
        res.json(result)
    } catch (err) {
        console.log("errpr getPopularVideos")
        res.status(405).send("errorBITCHH")
    }
}

const getChannelVideos = async (req, res, next) => {
    const playlistId = req.query.playlistId
    
    try {

    } catch (err) {

    }
}

module.exports = {searchVideos, getPopularVideos, getChannelVideos}