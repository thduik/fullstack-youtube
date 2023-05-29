const express = require('express')
const youtubeRouter = express.Router()

//app.use('/youtube', youtubeRouter)

youtubeRouter.get('/search', (req,res,next)=>{
    console.log("youtubeRouter get called req.query.q", req.query.q, "req.query.limit", req.query.limit)
})

module.exports = {youtubeRouter}