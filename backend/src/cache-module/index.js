const {connectCache} = require('./connectDb')
const {getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache, getAllVideosOfPlaylistFromCache, addVideosOfPlaylistToCache,createPlaylistCache,addVideoToPlaylistsCache} = require('./playlist')
module.exports = { connectCache,
     getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache, 
     getAllVideosOfPlaylistFromCache,addVideosOfPlaylistToCache
,createPlaylistCache,addVideoToPlaylistsCache}

