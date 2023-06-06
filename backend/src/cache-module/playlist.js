const {redisClient} = require('./connectDb')

const getPlaylistsOfUserFromCache = async (userid) => {
    

    try {
        const playlistIds = await redisClient.sMembers(`user:${userid}:playlists`)
        if (!playlistIds) { //key not set will return null
            return {isSet:false}
        }
        const playlistArr = []
        playlistIds.map((ids)=>{ //id strings
            playlistArr.push(redisClient.hGet(`playlist:${ids}`))
            // playlistArr.push(redisClient.sMembers(`playlist:${ids}:videos`))
        })
        return {isSet:true, data:playlistArr}
    } catch (err) {
        throw("getPlaylistsOfUserCache err", err )
    }
}


const addPlaylistsOfUserToCache = async (playlistDocs, userid) => {
    try {
        playlistDocs.map((pdoc) => {
            redisClient.sAdd(`user:${userid}:playlists`, pdoc._id)
            redisClient.hGet(`playlist:${ids}`, pdoc)
        })

    } catch(err) {    
        throw("err addPlaylistsOfUserToCache", err)      
    }
    
}

module.exports = {getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache}