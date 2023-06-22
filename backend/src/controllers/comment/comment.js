const { fetchCommentsOfVideo, fetchCommentsOfParentThread } = require("./comment-api")



const getCommentThreadsOfVideos = async (req, res, next) => {
    const videoId = req.params.videoid
    const pageToken = req.query.pageToken
    try {
        const result = await fetchCommentsOfVideo({videoId:videoId, pageToken:pageToken})
        console.log("getCommentThreadsOfVideos success result.length",  result.items.length ) // items: [items: [{kind: 'youtube#commentThread',etag:'string', id:'string', snippet: [Object]}]
        res.json(result)
    } catch (err) {
        console.log("getCommentThreadsOfVideos err", err)
        res.status(404).send('errorlolsno')
    }
}

const getCommentsOfParentThread = async (req, res,next) => {
    const parentId = req.query.parentid
    const pageToken = req.query.pageToken

    try {
        const result = await fetchCommentsOfParentThread({parentId:parentId, pageToken:pageToken})
        console.log("getCommentsOfCommentThread success result.length",  result.items.length ) // items: [items: [{kind: 'youtube#commentThread',etag:'string', id:'string', snippet: [Object]}]
        res.json(result)
    } catch (err) {
        console.log("getCommentThreadsOfVideos err", err)
        res.status(404).send('errorlolsno')
    }



}



module.exports = {getCommentThreadsOfVideos, getCommentsOfParentThread}