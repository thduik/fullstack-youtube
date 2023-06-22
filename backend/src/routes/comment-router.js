const express = require('express')
const { getCommentThreadsOfVideos, getCommentsOfParentThread } = require('../controllers/comment/comment')
const commentRouter = express.Router()

//app.use('/youtube', youtubeRouter)

commentRouter.get('/threads/video/:videoid', (req,res,next)=>{
    console.log("commentRouter get comment threads of videos called", )
    getCommentThreadsOfVideos(req, res, next)
})

commentRouter.get('/parent', (req,res,next)=>{   
    console.log("commentRouter get comments of parent thread called", req.query)
    getCommentsOfParentThread(req, res, next)
})


module.exports = {commentRouter}