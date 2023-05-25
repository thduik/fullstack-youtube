// tiny version of videoinfo used for playlist
const mongoose = require('mongoose')


const PlaylistVideoInfoSchema = new mongoose.Schema({
    playlistId:{
        //use the _id field of Playlist document, unsensitive data
        type:String,
        index:true,
        required:true
    },
    videoId:String,
    channelName:String,
    thumbnailUrl:String,
    createdAt:Number
})

module.exports = mongoose.model("PlaylistVideoInfo", PlaylistVideoInfoSchema);