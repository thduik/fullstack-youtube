const { fetchCommentsOfVideo } = require("./comment-api")



const getCommentThreadsOfVideos = async (req, res, next) => {
    const videoId = req.params.videoid
    const pageToken = req.query.pageToken
    try {
        const result = await fetchCommentsOfVideo({videoId:videoId, pageToken:pageToken})
        console.log("getCommentThreadsOfVideos success result.length",  result.length ) // items: [items: [{kind: 'youtube#commentThread',etag:'string', id:'string', snippet: [Object]}]
        res.json(result)
    } catch (err) {
        console.log("getCommentThreadsOfVideos err", err)
        res.status(404).send('errorlolsno')
    }
}

const getCommentsOfCommentThread = (req, res,next) => {
    const threadId = req.params.threadId

}



module.exports = {getCommentThreadsOfVideos, getCommentsOfCommentThread}