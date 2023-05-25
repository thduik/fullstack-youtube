const Playlist = require('../models/Playlist')
const PlaylistVideoInfo = require('../models/PlaylistVideoInfo')

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
            userName: playlist.userName,
            isPrivate:playlist.isPrivate ?? false
        })
        const videoRes = await PlaylistVideoInfo.create({
            playlistId:playlistDoc._id.toString(),
            videoId:videoData.videoId,
            thumbnailUrl:videoData.thumbnailUrl,
            createdAt:videoData.createdAt
        })
        console.log("createPlaylist success doc is", playlistDoc, videoRes)
        return playlistDoc._id.toString()
    } catch (err) {
        throw("createPlaylist err", err.message) 
    }
}

module.exports = {createPlaylistDb, getAllPlaylistsOfUser}