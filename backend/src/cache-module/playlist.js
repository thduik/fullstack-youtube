const {redisClient} = require('./connectDb')

const getPlaylistsOfUserFromCache = async (userid) => {
    

    try {
        const playlistIds = await redisClient.sMembers(`user:${userid}:playlists`)
        
        if (!playlistIds || !playlistIds.length) { //key not set will return null
            console.log("playlistIdsCache failed",playlistIds)
            return {isSet:false}
        }
        console.log("playlistIdsCache success",playlistIds)
        const playlistArr = []

        for (var i = 0;i<playlistIds.length;i++) { //id strings
            const ids = playlistIds[i]
            console.log('ids is',ids)
            const playres = await redisClient.hGetAll(`playlist:${ids}`)
            if (playres) {  //if hGet failed, playres will be null 
                playlistArr.push( playres ) 
            }
        }
        console.log("playlistArrCache", playlistArr)
        return {isSet:true, data:playlistArr}
    } catch (err) {
        throw("getPlaylistsOfUserCache err", err )
    }
}


const addPlaylistsOfUserToCache = async (playlistDocs, userid) => {
    console.log("addPlaylistsOfUserToCache playlistDocs", playlistDocs)
    try {
        playlistDocs.map((pdoc) => {
            const idString = pdoc._id.toString()
            pdoc._id = pdoc._id.toString()
            pdoc.isPrivate = pdoc.isPrivate ? 1: 0,
            pdoc.isUnlisted = pdoc.isUnlisted ? 1 : 0,
            Object.keys(pdoc).forEach((keylol) => console.log(keylol, typeof pdoc[keylol]))
            redisClient.sAdd(`user:${userid}:playlists`, idString)
            redisClient.hSet(`playlist:${idString}`, pdoc)
        })
        return {success:true}
    } catch(err) {    
        throw("err addPlaylistsOfUserToCache", err)      
    }
    
}

module.exports = {getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache}