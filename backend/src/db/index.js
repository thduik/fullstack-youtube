const { returnUserInfoFromDbWithUserIdPromise } = require("./user-db")
const { createPlaylistDb, getAllPlaylistsOfUser, getAllVideosOfPlaylist, 
    addVideoToPlaylistsConcurrentDb, deleteVideoFromPlaylistDb } = require("./playlist-db")

const getUserFromCacheOrDb = async (userid) => {
    try {
        const res = await returnUserInfoFromDbWithUserIdPromise(userid)
        if (res.length == 0) {
            throw("cannot find user in db")
        }
        return res[0]
    }catch (err) {
        throw("err getUserFromCacheOrDb", err)
    }
}

module.exports = {getUserFromCacheOrDb, createPlaylistDb, getAllPlaylistsOfUser, getAllVideosOfPlaylist, 
    addVideoToPlaylistsConcurrentDb, deleteVideoFromPlaylistDb}