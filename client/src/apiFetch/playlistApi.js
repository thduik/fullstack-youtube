import axios from 'axios'
import { processResData } from './utils'
const baseUrl = 'https://holysheet2831.hopto.org/api'

export const getPlaylist = async (callback) => {
    //// resJson = {email,googleid,name,pictureUrl,userId,userName}
    //return array of playlist objects
    //creds is stored in cookies

    try {
        const getUrl = baseUrl + '/playlist'
        const res = await axios.get(getUrl)
        console.log("getPlaylist success playlists are", res.data.playlists)
        const res2 = processResData(res)
        callback(res2.data.playlists)
        return
    } catch (err) {
        console.log("err getPlaylist", err)
        return
    }

}



export const postPlaylistCreate = async (newPlaylist, video) => {
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

const processVideoData = (videoData) => {
    const res = {
        videoId: videoData.videoId,
        videoName: videoData.tite,
        thumbnailUrl: videoData.thumbnails.default.url,
        createdAt: Date.now()
    }
    return res
}

export const postAddVideoToPlaylist = async (video, playlistArr) => {
    if (!playlistArr.length) { return }
    console.log("postAddVideoToPlaylist called", videoData, playlistArr)
    const videoData = processVideoData(video)
    try {
        const updateUrl = baseUrl + `/playlist/update/`
        const playlistIdArr = playlistArr.map(o => o._id)
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


const testAddVideoToPlaylist = async (playlistArr, videoData) => {
    //this happens because in playlistSelectMenu frontend, 1 video can be added to multiple playlists

    console.log("testAddVideoToPlaylist called", playlistArr)
    try {

        const updateUrl = baseUrl + `/playlist/update/`
        const playlistIdArr = playlistArr.map(o => o._id)
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