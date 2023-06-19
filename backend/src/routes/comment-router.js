const express = require('express')
const { getCommentThreadsOfVideos } = require('../controllers/comment/comment')
const commentRouter = express.Router()

//app.use('/youtube', youtubeRouter)

commentRouter.get('/threads/video/:videoid', (req,res,next)=>{
    console.log("commentRouter get comment threads of videos called", )
    getCommentThreadsOfVideos(req, res, next)
})

commentRouter.get('/:threadid', (req,res,next)=>{   
    console.log("commentRouter get comment of comment thread called", req.query)
    searchVideos(req, res, next)
})


module.exports = {commentRouter}