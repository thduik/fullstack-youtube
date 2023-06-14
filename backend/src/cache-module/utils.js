const parseVideoDoc = (doc) => {
    const res = {
        
        playlistId: doc.playlistId,
        videoName: doc.videoName,
        videoId: doc.videoId,
        thumbnailUrl: doc.thumbnailUrl,
        createdAt: doc.createdAt,
        channelName: doc.channelName,
        _id: doc._id.toString(),
        thumbnails: doc.thumbnails

    }
    return res
}

const parsePlaylistDoc = (doc) => {
    const res = { 
        playlistName: doc.playlistName,
        userid: doc.userid,
        thumbnailUrl: doc.thumbnailUrl ?? 'none',
        thumbnails:doc.thumbnails,
        isPrivate: doc.isPrivate ? 1 : 0,
        isUnlisted: doc.isUnlisted ? 1 : 0,
        createdAt: doc.createdAt,
        count: doc.count,
        _id: doc._id.toString(),
    }

    return { 
        playlistName: doc.playlistName,
        userid: doc.userid,
        thumbnailUrl: doc.thumbnailUrl ?? 'none',
        isPrivate: doc.isPrivate ? 1 : 0,
        isUnlisted: doc.isUnlisted ? 1 : 0,
        createdAt: doc.createdAt,
        count: doc.count,
        _id: doc._id.toString(),
    }
}

// const convertVideoDoc = (doc) => {
//     const res = {
//         playlistId: doc.playlistId,
//         videoName: doc.videoName,
//         videoId: doc.videoId,
//         thumbnailUrl: doc.thumbnailUrl,
//         createdAt: doc.createdAt,
//         _id: doc._id.toString()
//     }
//     return res
// }

module.exports = {parseVideoDoc,parsePlaylistDoc}