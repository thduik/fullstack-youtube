const mongoose = require('mongoose');
const { defaultPlaylistThumbnailUrl } = require('./constants');


const playlistSchema = new mongoose.Schema({

    _id: {
        type:String,
        required:true
    },
    playlistName: {
        type:String,
        require:true
    },
    userid: {
        type:String,
        required:[true,"mongo model no userid"],
        index:true
    },
    creatorName: {
        type:String,
    },
    length: {
        type:Number,
        default:0
    },
    thumbnailUrl: {
        type:String,
        default:defaultPlaylistThumbnailUrl
    },
    isPrivate: {
        type:Boolean,
        required:true,
        default:false
    },
    isUnlisted: {
        type:Boolean,
        required:true,
        default:false
    }
    
})

module.exports = mongoose.model("YoutubePlaylist", playlistSchema);