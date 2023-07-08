const express = require('express')
const { searchVideos, getPopularVideos, getChannelVideos } = require('../controllers/search/search')
const { getShortsOfChannel } = require('../controllers/shorts/shorts')
const { getPopularVideosDev } = require('../dev-only')
const { getChannelDetails } = require('../controllers/channel/channelDetails')
const youtubeRouter = express.Router()

//app.use('/youtube', youtubeRouter)

youtubeRouter.get('/video/search', (req,res,next)=>{
    console.log("youtubeRouter get called req.query.q", req.query.q, "req.query.limit", req.query.limit)
    searchVideos(req, res, next)
})


youtubeRouter.get('/videos/popular',getPopularVideos)
youtubeRouter.get('/videos/popular/dev',getPopularVideosDev)
// youtubeRouter.get('/channel/videos', getChannelVideos)
youtubeRouter.get('/channel/shorts', getShortsOfChannel)
youtubeRouter.get('/channel/details', getChannelDetails)

module.exports = {youtubeRouter}