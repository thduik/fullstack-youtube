const { getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache} = require("../cache-module")
const { getAllPlaylistsOfUser } = require("../db")

// const createPlaylist = (req, res, next) => {
//     try {
//         const doc = await createPlaylistDb(playlist, videoInfo)
//         res.json({ doc: doc, success: true })

//     } catch (err) {
//         console.log("err createPlaylist", err)
//         res.status(402).send("error creatingPlaylist")
//     }
// }


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
        return result.data
    } catch (err) {
        throw("error getPlaylistsOfUser", err)
        
    }
    
}

module.exports = {getPlaylistsOfUserDataM}