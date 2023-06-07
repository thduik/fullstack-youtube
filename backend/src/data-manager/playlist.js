const { getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache
    , getAllVideosOfPlaylistFromCache, addVideosOfPlaylistToCache
,createPlaylistCache} = require("../cache-module")
const { getAllPlaylistsOfUser, getAllVideosOfPlaylist, createPlaylistDb } = require("../db")

const createPlaylistDataM = async (playlist, videoInfo) => {
    try {
        const result = await createPlaylistDb(playlist, videoInfo) //{playlist:playlistDoc, video:videoRes}
        console.log("createPLaylistDoc",result.playlist)
        await createPlaylistCache(result) //{playlist:playlistDoc, video:videoRes}
        return result.playlist
        
    } catch (err) {
        console.log("err createPlaylist", err)
        res.status(402).send("error creatingPlaylist")
    }
}

const getVideosListOfPlaylistDataM = async (playlistid) => {

    try {
        //{isSet:bool, data:data}
        const result = await getAllVideosOfPlaylistFromCache(playlistid)
        if (!result.isSet) {
            const videoDocs = await getAllVideosOfPlaylist(playlistid)
            await addVideosOfPlaylistToCache(playlistid, videoDocs)
            console.log("getVideosListOfPlaylistDbDataM success", videoDocs)

            return videoDocs
        }
        console.log("getVideosListOfPlaylistCacheDataM success", videoDocs)
        return result.data
    } catch (err) {
        // console.log("getVideosListOfPlaylist", err)
        throw("error getVideosListOfPlaylist", err)
    }
}


const getPlaylistsOfUserDataM = async (userid) => {
    try {
        const result = await getPlaylistsOfUserFromCache(userid) //return object is {isSet:bool, data:data}
        if (!result.isSet) {
            const playlistsDocs = await getAllPlaylistsOfUser(userid)
            addPlaylistsOfUserToCache(playlistsDocs, userid)
            // console.log("result isSet false",playlistsDocs, userid)
            return playlistsDocs
        }     
        //playlistsDocs and result.data should be exact same
        console.log("getPlaylistsOfUserDataM", result.data[0].thumbnailUrl)
        return result.data
    } catch (err) {
        throw("error getPlaylistsOfUser", err)
        
    }
    
}

module.exports = {getPlaylistsOfUserDataM, getVideosListOfPlaylistDataM
,createPlaylistDataM}