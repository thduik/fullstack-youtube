const Playlist = require('../models/Playlist')
const PlaylistVideoInfo = require('../models/PlaylistVideoInfo')
var ObjectID = require("bson-objectid");

const getAllVideosOfPlaylist = async (playlistid) => {
    try {
        const docs = await PlaylistVideoInfo.find({playlistId:playlistid}).lean()
        return docs
    } catch (err) {
        throw("error getAllVideosOfPlaylist", err)
    }
}

const getAllPlaylistsOfUser = async (userid) => {
    try {
        const docs = await Playlist.find({userid:userid}).lean()
        return docs
    } catch (err) {
        throw("error getAllPlaylistsOfUser", err.message)
    }
}

const createPlaylistDb = async (playlist, videoData) => {
    //return the _id of document
    //playlistName is not unique, unique identifier is _id of mongoose document
    //because data is not sensitive anyways
    console.log("createPlaylistDb db called", videoData, playlist)
    try {
        const playlistDoc = await Playlist.create({
            
            playlistName: playlist.playlistName,
            userid: playlist.userid,
            creatorName: playlist.creatorName,
            isPrivate:playlist.isPrivate ?? false
        })

        const playlistId = playlistDoc._id.toString()
        console.log("playlistDocDb _id", playlistDoc._id.toString())
        
        const videoRes = await PlaylistVideoInfo.create({
            playlistId:playlistId,
            videoId:videoData.videoId,
            videoName:videoData.videoName,
            thumbnailUrl:videoData.thumbnailUrl.url,
            createdAt:videoData.createdAt
        })
        console.log("createPlaylistDb success doc is", playlistDoc, videoRes)
        return {playlist:playlistDoc, video:videoRes}
        
    } catch (err) {
        throw("createPlaylist err", err.message) 
    }
}

const returnCreatePlaylistVideoInfoPromise = (playlistid, videoData) => {
    return PlaylistVideoInfo.create({
        
        playlistId:playlistid,
        videoId:videoData.videoId,
        videoName:videoData.videoName,
        thumbnailUrl:videoData.thumbnailUrl,
        createdAt:videoData.createdAt
    })
}

//{
const addVideoToPlaylistsConcurrentDb = async (playlistIdArr, videoData) => {
    console.log("addVideoToPlaylistsConcurrentDb is", videoData, playlistIdArr)
    try {
        const promiseArr = playlistIdArr.map((x)=>returnCreatePlaylistVideoInfoPromise(x, videoData))
        const res = await Promise.all(promiseArr)
        return res
    } catch (err) {
        throw("err addVideoToPlaylistDb", err)
    }
    
}

const deleteVideoFromPlaylistDb = async (video, orderIndex) => {
    console.log("deleteVideoFromPlaylistDb video._id:", video._id, video)
    try {
        //delete promise and increment -1 (decrement) playlist count 
        const promiseArr = [()=>PlaylistVideoInfo.deleteMany({_id:video._id}), ()=>Playlist.findOneAndUpdate({$inc: {"count":-1} })]
        const res = await Promise.all(promiseArr)
        return res
    } catch (err) {
        throw("deleteVideoFromPlaylistDb err", err)
    }
}

module.exports = {createPlaylistDb, getAllPlaylistsOfUser, getAllVideosOfPlaylist,
    addVideoToPlaylistsConcurrentDb, deleteVideoFromPlaylistDb}