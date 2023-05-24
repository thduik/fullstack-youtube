const Playlist = require('../models/Playlist')

const getAllPlaylistsOfUser = async (userid) => {
    try {
        const docs = await Playlist.find({userid:userid}).lean()
        return docs
    } catch (err) {
        throw("error getAllPlaylistsOfUser", err.message)
    }
}

const createPlaylistDb = async (playlist) => {
    //return the _id of document
    //playlistName is not unique, unique identifier is _id of mongoose document
    //because data is not sensitive anyways
    try {
        const doc = await Playlist.create({
            playlistName: playlist.playlistName,
            userid: playlist.userid,
            userName: playlist.userName,
            videoArray: playlist.videoArray,
            isPrivate:playlist.isPrivate ?? false
        })
        console.log("createPlaylist success doc is", doc)
        return doc._id.toString()
    } catch (err) {
        throw("createPlaylist err", err) 
    }
}

module.exports = {createPlaylistDb, getAllPlaylistsOfUser}