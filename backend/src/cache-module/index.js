const {connectCache} = require('./connectDb')
const {getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache, getAllVideosOfPlaylistFromCache, addVideosOfPlaylistToCache,createPlaylistCache,addVideoToPlaylistsCache
,getPlaylistDataFromCache,addPlaylistDataToCache
, deleteVideoFromPlaylistCache
    , deletePlaylistOfUserCache} = require('./playlist')
module.exports = { connectCache,
     getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache, 
     getAllVideosOfPlaylistFromCache,addVideosOfPlaylistToCache
,createPlaylistCache,addVideoToPlaylistsCache, getPlaylistDataFromCache
,addPlaylistDataToCache
, deleteVideoFromPlaylistCache
    , deletePlaylistOfUserCache}

