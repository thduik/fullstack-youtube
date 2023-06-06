const {connectCache} = require('./connectDb')
const {getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache} = require('./playlist')
module.exports = { connectCache, getPlaylistsOfUserFromCache, addPlaylistsOfUserToCache}

