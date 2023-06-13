const { getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache
    , getAllVideosOfPlaylistFromCache, addVideosOfPlaylistToCache
,createPlaylistCache,addVideoToPlaylistsCache,getPlaylistDataFromCache, addPlaylistDataToCache} = require("../cache-module")
const { getAllPlaylistsOfUserDb, getAllVideosOfPlaylistDb, createPlaylistDb
,addVideoToPlaylistsConcurrentDb } = require("../db")

const addVideoToPlaylistsDataM = async (playlistIdArr, videoLol) => {
    //add 1 video to multiple playlists
    console.log("addVideoToPlaylistsDataM", playlistIdArr, videoLol)
    try {
        
        const videoDocArr = await addVideoToPlaylistsConcurrentDb(playlistIdArr, videoLol)
        //videoDocArr = [{playlistId:string,videoName:string,videoId:string,thumbnailUrl:string,createdAt:string,_id:string}] array of PlaylistVideoSchema doc
        const cacheRes = await addVideoToPlaylistsCache(videoDocArr)
        return {success:true}
    } catch (err) {
        console.log("addVideoToPlaylist controller err", err)
    }
}

const createPlaylistDataM = async ({playlist, videoInfo}) => {
    console.log("createPlaylistDataM videoInfo", videoInfo)
    try {
        const result = await createPlaylistDb({playlist:playlist, videoData:videoInfo}) //{playlist:playlistDoc, video:videoRes}
        console.log("createPLaylistDataM success result.playlist._id and result.video._d:",result.playlist._id, result.video._id)
        await createPlaylistCache(result) //{playlist:playlistDoc, video:videoRes}
        return result.playlist
        
    } catch (err) {
        console.log("err createPlaylistDataM", err)
        // console.log("error creatingPlaylist")
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

const getPlaylistDetailDataM = async (playlistId) => {
    try {
        const res = await getPlaylistDataFromCache(playlistId)
        if (!res.isSet) {
            const res2 = await 
            addPlaylistDataToCache
        }
    } catch (err) {
        throw("getPlaylistDetailDataM err", err)
    }
}

module.exports = {getPlaylistsOfUserDataM, getVideosListOfPlaylistDataM
,createPlaylistDataM, addVideoToPlaylistsDataM, getPlaylistDetailDataM}