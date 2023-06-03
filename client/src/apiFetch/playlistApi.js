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

export const postAddVideoToPlaylists = async (video, playlistarr) => {
    if (!playlistarr.length) { return }
    console.log("postAddVideoToPlaylists called", video, playlistarr.map(o => o.playlistName))
}

export const postPlaylistCreate = async ( newPlaylist, video) => {
    //user = {userid}
    //playlist.name, playlist.privacy
    try {
       
        const createUrl = baseUrl + '/playlist/create'
        const res = await axios.post(createUrl,
            {
                playlist: newPlaylist,
                videoInfo: {
                    videoId: video.videoId,
                    videoName: video.title,
                    thumbnailUrl: video.thumbnails.default,
                    createdAt: Date.now()
                }


            })
        console.log("postPlaylistCreate success docid is", res.data)
        return res.data
    } catch (err) {
        console.log("postPlaylistCreate error", err)
    }
}

export const postAddVideoToPlaylist = async (videoData, playlistArr) => {
    if (!playlistArr.length) { return }
    console.log("testAddVideoToPlaylist called", playlistArr)
    
    try {
        const updateUrl = baseUrl + `/playlist/update/`
        const playlistIdArr = playlistArr.map(o => o._id ?? "s")
        console.log("testAddVideoToPlaylist", videoData, playlistIdArr)
        const res = await axios.post(updateUrl,
            {
                videoData: videoData,
                playlistIdArr: playlistIdArr

            })
        // console.log("testPostAxios success docid is", res.data)
        return res.data

    } catch (err) {
        throw ("err testAddVideoToPlaylist", err)
    }

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