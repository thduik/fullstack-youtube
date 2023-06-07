const {connectCache} = require('./connectDb')
const {getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache, getAllVideosOfPlaylistFromCache, addVideosOfPlaylistToCache,createPlaylistCache} = require('./playlist')
module.exports = { connectCache,
     getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache, 
     getAllVideosOfPlaylistFromCache,addVideosOfPlaylistToCache
,createPlaylistCache}

