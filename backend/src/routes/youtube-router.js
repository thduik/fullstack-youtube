const express = require('express')
const { searchVideos } = require('../controllers/search/search')
const youtubeRouter = express.Router()

//app.use('/youtube', youtubeRouter)

youtubeRouter.get('/video/search', (req,res,next)=>{
    console.log("youtubeRouter get called req.query.q", req.query.q, "req.query.limit", req.query.limit)
    searchVideos(req, res, next)
})

module.exports = {youtubeRouter}