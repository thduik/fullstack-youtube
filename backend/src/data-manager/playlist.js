const { getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache
    , getAllVideosOfPlaylistFromCache, addVideosOfPlaylistToCache
,createPlaylistCache,addVideoToPlaylistsCache} = require("../cache-module")
const { getAllPlaylistsOfUserDb, getAllVideosOfPlaylistDb, createPlaylistDb
,addVideoToPlaylistsConcurrentDb } = require("../db")

const addVideoToPlaylistsDataM = async (playlistIdArr, videoLol) => {
    try {
        
        const videoDocArr = await addVideoToPlaylistsConcurrentDb(playlistIdArr, videoLol)
        //videoDocArr = [{playlistId:string,videoName:string,videoId:string,thumbnailUrl:string,createdAt:string,_id:string}] array of PlaylistVideoSchema doc
        const cacheRes = await addVideoToPlaylistsCache(videoDocArr)
        return {success:true}
    } catch (err) {
        console.log("addVideoToPlaylist controller err", err)
    }
}

const createPlaylistDataM = async (playlist, videoInfo) => {
    try {
        const result = await createPlaylistDb(playlist, videoInfo) //{playlist:playlistDoc, video:videoRes}
        console.log("createPLaylistDataM success result.playlist._id and result.video._d:",result.playlist._id, result.video._id)
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
            const videoDocs = await getAllVideosOfPlaylistDb(playlistid)
            console.log("getVideosListOfPlaylistDbDataM success videoDocs.length", videoDocs.length)
            await addVideosOfPlaylistToCache(playlistid, videoDocs)
            return videoDocs
        }
        console.log("getVideosListOfPlaylistCacheDataM success result.isSet", result.isSet)
        return result.data
    } catch (err) {
        // console.log("getVideosListOfPlaylist", err)
        throw("error getVideosListOfPlaylistCacheDataM", err)
    }
}


const getPlaylistsOfUserDataM = async (userid) => {
    try {
        
        
        const result = await getPlaylistsOfUserFromCache(userid) //return object is {isSet:bool, data:data}
        console.log("")
        if (!result.isSet) {
            const playlistsDocs = await getAllPlaylistsOfUserDb(userid)
            addPlaylistsOfUserToCache(playlistsDocs, userid)
            console.log("result isSet false",playlistsDocs, userid)
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
,createPlaylistDataM, addVideoToPlaylistsDataM}