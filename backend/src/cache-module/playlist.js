const { redisClient } = require('./connectDb')
const { parseVideoDoc, parsePlaylistDoc } = require('./utils')



const addVideoToPlaylistsCache = async (videoDocArr) => {
    console.log("addVideoToPlaylistsCache", videoDocArr)
    try {
        for (var i = 0; i < videoDocArr.length; i++) {
            const doc = parseVideoDoc(videoDocArr[i])
            // console.log("addVideoToPlaylistsCache map doc._id", doc._id)
            const keylol = doc.videoId+":"+ doc.createdAt.toString()
            await redisClient.sAdd(`playlist:${doc.playlistId}:videos`, keylol)
            const success = await redisClient.hSet(`playvideo:${doc.videoId}`, doc)
            const res = await redisClient.hGetAll(`playvideo:${doc.videoId}`)
            console.log("add playvideoHsetVideoId res.videoId,res.videoName ",success,keylol, doc.videoName, res.videoId, res.videoName, doc)
        }
        return { success: true }
    } catch (err) {
        console.log("addVideoToPlaylistsCache err", err)
    }
}


const createPlaylistCache = async (result) => {
    // result = { playlist:{ _doc: playlistDoc }, video:{ _doc:videoRes } }
    // console.log("createPlaylistCache called, result", result)
    const playlist = parsePlaylistDoc(result.playlist._doc);
    const video = parseVideoDoc(result.video._doc)
    playlist.isPrivate = playlist.isPrivate ? 1 : 0; playlist.isUnlisted = playlist.isUnlisted ? 1 : 0 //convert bool to 1 and 0

    console.log("createPlaylistCache called video and playlist._id:", playlist._id, video._id, playlist.userid)
    try {
        
        await redisClient.sAdd(`user:${playlist.userid}:playlists`, playlist._id)
        await redisClient.hSet(`playlist:${playlist._id}`, playlist)
        await redisClient.sAdd(`playlist:${playlist._id}:videos`, video.videoId+":"+video.createdAt.toString())
        await redisClient.hSet(`playvideo:${video.videoId}`, video)

        const testRes = await redisClient.sMembers(`user:${playlist.userid}:playlists`)
        // console.log("createPlaylistCache finished playvideoHsetVideoId", playlist.userid, video.videoName, "testRes is:",testRes )

        return
    } catch (err) {
        console.log("createPlaylistCache err", err)
    }


}


const addVideosOfPlaylistToCache = async (playlistid, videoDocs) => {
    console.log("addVideosOfPlaylistToCache called videoDocs.length:", videoDocs.length)
    // await redisClient.sAdd(`playlist:${idString}:videos`, )
    try {
        for (var i = 0; i < videoDocs.length; i++) {
            const video = videoDocs[i]
            video._id = video._id.toString()
            await redisClient.sAdd(`playlist:${playlistid}:videos`, video.videoId + ":" + video.createdAt.toString())
            const res = await redisClient.hSet(`playvideo:${video.videoId}`, video)
            console.log("addVideosOfPlaylistToCache success playvideoHsetVideoId:", res, video.videoId, video.videoName)
        }
        return { success: true }
    } catch (err) {
        console.log("addVideosOfPlaylistToCache err", err)
    }

}


const getPlaylistsOfUserFromCache = async (userid) => {


    try {
        const playlistIds = await redisClient.sMembers(`user:${userid}:playlists`)
        // console.log("getPlaylistsOfUserFromCache userId is",userid )
        if (!playlistIds || !playlistIds.length) { //key not set will return null
            // console.log("playlistIdsCache failed",playlistIds)
            return { isSet: false }
        }
        // console.log("playlistIdsCache success",playlistIds)
        const playlistArr = []

        for (var i = 0; i < playlistIds.length; i++) { //id strings
            const ids = playlistIds[i]
            console.log('playlistIds is', ids)
            const playres = await redisClient.hGetAll(`playlist:${ids}`)
            if (playres) {  //if hGet failed, playres will be null 

                playlistArr.push(playres)
            }
        }
        const resss = { isSet: true, data: playlistArr }
        // console.log("getPlaylistsOfUserFromCache", resss)
        return resss
    } catch (err) {
        throw ("getPlaylistsOfUserCache err", err)
    }
}


const addPlaylistsOfUserToCache = async (playlistDocs, userid) => {
    console.log("addPlaylistsOfUserToCache playlistDocs", playlistDocs)
    try {

        for (var i = 0; i < playlistDocs.length; i++) { //convert boolean to 1 and 0 because redis don't accept js bool
            const pdoc = playlistDocs[i]
            const idString = pdoc._id.toString()
            pdoc._id = pdoc._id.toString()
            pdoc.isPrivate = pdoc.isPrivate ? 1 : 0,
                pdoc.isUnlisted = pdoc.isUnlisted ? 1 : 0,
                Object.keys(pdoc).forEach((keylol) => console.log(keylol, typeof pdoc[keylol]))
            await redisClient.sAdd(`user:${userid}:playlists`, idString)
            await redisClient.hSet(`playlist:${idString}`, pdoc)

        }
        return { success: true }
    } catch (err) {
        throw ("err addPlaylistsOfUserToCache", err)
    }

}


//videoDocs = array of [PlaylistVideoInfoSchema]
const getAllVideosOfPlaylistFromCache = async (playlistid) => {
    // console.log("getAllVideosOfPlaylistFromCache called")
    try {
        const videoIdArr = await redisClient.sMembers(`playlist:${playlistid}:videos`)
        console.log("cache videoIdArr:", videoIdArr)
        if (!videoIdArr || !videoIdArr.length) {
            console.log("isSet false")
            return { isSet: false }
        }
        const videoResArr = []
        for (var i = 0; i < videoIdArr.length; i++) {
            // console.log("videoIdArrMap",videoIdArr[i])
            const [videoId, createdAtString] = videoIdArr[i].split(":")
            const videoRes = await redisClient.hGetAll(`playvideo:${videoId}`)
            videoRes.createdAt = parseInt(createdAtString)
            // console.log("cacheVideoRes", videoId, videoRes)
            if (videoRes) { videoResArr.push(videoRes) }
        }
        return { isSet: true, data: videoResArr }

    } catch (err) {
        console.log("error getAllVideosOfPlaylistFromCache, throw next line")
        throw ("getAllVideosOfPlaylistFromCache err", err)
    }
}

module.exports = {
    getPlaylistsOfUserFromCache
    , addPlaylistsOfUserToCache
    , getAllVideosOfPlaylistFromCache
    , addVideosOfPlaylistToCache
    , createPlaylistCache
    , addVideoToPlaylistsCache
}