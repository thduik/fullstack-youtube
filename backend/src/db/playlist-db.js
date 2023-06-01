const Playlist = require('../models/Playlist')
const PlaylistVideoInfo = require('../models/PlaylistVideoInfo')

const getAllVideosOfPlaylist = async (playlistid) => {
    try {
        const docs = await PlaylistVideoInfo.find({playlistId:playlistid})
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
    try {
        const playlistDoc = await Playlist.create({
            playlistName: playlist.playlistName,
            userid: playlist.userid,
            creatorName: playlist.creatorName,
            isPrivate:playlist.isPrivate ?? false
        })
        const videoRes = await PlaylistVideoInfo.create({
            playlistId:playlistDoc._id.toString(),
            videoId:videoData.videoId,
            videoName:videoData.videoName,
            thumbnailUrl:videoData.thumbnailUrl.url,
            createdAt:videoData.createdAt
        })
        console.log("createPlaylist success doc is", playlistDoc, videoRes)
        return playlistDoc._id.toString()
    } catch (err) {
        throw("createPlaylist err", err.message) 
    }
}

const addVideoToPlaylistDb = async (playlistid, videoData, playlistData) => {
    console.log("videData is", videoData)
    try {
        const videoRes = await PlaylistVideoInfo.create({
            playlistId:playlistid,
            videoId:videoData.videoId,
            videoName:videoData.videoName,
            thumbnailUrl:videoData.thumbnailUrl,
            createdAt:videoData.createdAt
        })
        return videoRes
    } catch (err) {
        throw("err addVideoToPlaylistDb", err)
    }
    
}

const deleteVideoFromPlaylistDb = async (video, orderIndex) => {
    console.log("deleteVideoFromPlaylistDb video._id:", video._id, video)
    try {
        const res = await PlaylistVideoInfo.deleteMany({_id:video._id})
        return res
    } catch (err) {
        throw("deleteVideoFromPlaylistDb err", err)
    }
}

module.exports = {createPlaylistDb, getAllPlaylistsOfUser, getAllVideosOfPlaylist,
    addVideoToPlaylistDb, deleteVideoFromPlaylistDb}