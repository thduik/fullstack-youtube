const { redisClient } = require('./connectDb')
const {parseVideoDoc,parsePlaylistDoc} = require('./utils')

const createPlaylistCache = async (result) => {
    // result = {playlist:playlistDoc, video:videoRes}
    // const {playlist, video} = result
    const playlist = parsePlaylistDoc( result.playlist._doc );
    const video = parseVideoDoc( result.video._doc )
        ; playlist.isPrivate = playlist.isPrivate ? 1 : 0; playlist.isUnlisted = playlist.isUnlisted ? 1 : 0 //convert bool to 1 and 0
    playlist._id = result.playlist._id.toString(); video._id = result.video._id.toString() // convert _id of type ObjectId (mongoose/bson) to string so redis can parse

    console.log("createPlaylistCache called", video, playlist)
    try {

        await redisClient.sAdd(`user:${playlist.userid}:playlists`, playlist._id)
        await redisClient.hSet(`playlist:${playlist._id}`, playlist)
        await redisClient.sAdd(`playlist:${playlist._id}:videos`, video._id)
        await redisClient.hSet(`playvideo:${video._id}`, video)

        const res = await redisClient.sMembers(`playlist:${playlist._id}:videos`)
        console.log("createPlaylistCache finished", video._id, playlist._id, res)
    } catch (err) {
        console.log("createPlaylistCache err", err)
    }


}

const addVideosOfPlaylistToCache = async (playlistid, videoDocs) => {
    console.log("addVideosOfPlaylistToCache called", videoDocs)
    // await redisClient.sAdd(`playlist:${idString}:videos`, )
}


const getPlaylistsOfUserFromCache = async (userid) => {


    try {
        const playlistIds = await redisClient.sMembers(`user:${userid}:playlists`)

        if (!playlistIds || !playlistIds.length) { //key not set will return null
            // console.log("playlistIdsCache failed",playlistIds)
            return { isSet: false }
        }
        // console.log("playlistIdsCache success",playlistIds)
        const playlistArr = []

        for (var i = 0; i < playlistIds.length; i++) { //id strings
            const ids = playlistIds[i]
            console.log('ids is', ids)
            const playres = await redisClient.hGetAll(`playlist:${ids}`)
            if (playres) {  //if hGet failed, playres will be null 

                playlistArr.push(playres)
            }
        }
        console.log("playlistArrCache", playlistArr[0]._id)
        return { isSet: true, data: playlistArr }
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
    try {
        const videoIdArr = await redisClient.sMembers(`playlist:${playlistid}:videos`)
        if (!videoIdArr || !videoIdArr.length) {
            console.log("isSet false")
            return { isSet: false }
        }
        const videoResArr = []
        for (var i = 0; i < videoIdArr.length; i++) {
            const videoRes = await redisClient.hGetAll(`playlist:${playlistid}:videos`)
            if (videoRes) { videoResArr.push(videoRes) }
        }
        return videoResArr

    } catch (err) {
        throw ("getAllVideosOfPlaylistFromCache err", err)
    }
}

module.exports = {
    getPlaylistsOfUserFromCache
    , addPlaylistsOfUserToCache
    , getAllVideosOfPlaylistFromCache
    , addVideosOfPlaylistToCache, createPlaylistCache
}