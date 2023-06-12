const { redisClient } = require("../src/cache-module/connectDb");
const connectDB = require("../src/db/connect-db");
const Playlist = require("../src/models/Playlist");
const PlaylistVideoInfo = require("../src/models/PlaylistVideoInfo");

const deleteAllPlaylist = async () => {
    try {
        const res = await Playlist.deleteMany({})
        return true
    } catch (err) {
        throw("deleteAllPlaylist", err)
    }
}

const deleteAllPlaylistVideoInfos = async () => {
    try {
        const res = await PlaylistVideoInfo.deleteMany({})
        return true
    } catch (err) {
        throw("deleteAllPlaylist", err)
    }
}

const main = async () => {
    await connectDB()
    await redisClient.flushAll()
    await deleteAllPlaylist()
    await deleteAllPlaylistVideoInfos()
    console.log("deleteAll success")
}

main()