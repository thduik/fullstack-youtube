const express = require('express')
const { searchVideos, getPopularVideos, getChannelVideos } = require('../controllers/search/search')
const { getShortsOfChannel } = require('../controllers/shorts/shorts')
const youtubeRouter = express.Router()

//app.use('/youtube', youtubeRouter)

youtubeRouter.get('/video/search', (req,res,next)=>{
    console.log("youtubeRouter get called req.query.q", req.query.q, "req.query.limit", req.query.limit)
    searchVideos(req, res, next)
})


youtubeRouter.get('/videos/popular',getPopularVideos)

// youtubeRouter.get('/channel/videos', getChannelVideos)
youtubeRouter.get('/channel/shorts', getShortsOfChannel)

module.exports = {youtubeRouter}