import axios from 'axios'

const baseUrl = 'https://holysheet2831.hopto.org/api'

export const getPlaylist = async (callback) => {
    //// resJson = {email,googleid,name,pictureUrl,userId,userName}
    //return array of playlist objects
    //creds is stored in cookies
    
    try {
        const getUrl = baseUrl + '/playlist'
        const res = await axios.get(getUrl)
        console.log("getPlaylist success playlists are", res.data.playlists)
        callback(res.data.playlists)
        return
    } catch (err) {
        console.log("err getPlaylist", err)
        return
    }

}

export const postPlaylistCreate = async (user, playlist, video) => {
    //user = {userid}
    //playlist.name, playlist.privacy
    var playlistPrivate = playlist.privacy == "Private" ? true : false
    var playlistUnlisted = playlist.privacy == "Unlisted" ? true : false

    const createUrl = baseUrl + '/playlist/create'
    const res = await axios.post(createUrl,
        {
            playlist: {
                playlistName: playlist.name,
                userid: user.userid,
                creatorName: user.name,
                isPrivate: playlistPrivate,
                isUnlisted: playlistUnlisted
            },
            videoInfo: {
                videoId: video.videoId,
                videoName: video.title,
                thumbnailUrl: video.thumbnails.default,
                createdAt: Date.now()
            }
            

        })
    // console.log("testPostAxios success docid is", res.data)
    return res.data
}

const videoDataArr = [
    {
        videoId: 'YJTae5ScvQA',
        videoName: 'Video 1 - Distrion & Electro-Light - Drakkar [NCS Release]',
        thumbnailUrl: 'https://i.ytimg.com/vi/YJTae5ScvQA/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhAIF8oZTAP&rs=AOn4CLAjKXBADPj9RjLfdyWvTZGREiwh7w',
        createdAt: Date.now()
    },
    {
        videoId: 'i3vrmI_7zq4',
        videoName: 'Video 2 - Devon Larrat New!! ANTI FLOP PRESS TRAINING',
        thumbnailUrl: 'https://i.ytimg.com/vi/i3vrmI_7zq4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCh3L6QqUk-yoM4OP_9nHNDvbZAYg',
        createdAt: Date.now()

    }
]