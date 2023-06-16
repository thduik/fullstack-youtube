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
        callback(res.data.playlists)
        return
    } catch (err) {
        console.log("err getPlaylist", err)
        return
    }

}



export const postPlaylistCreate = async (newPlaylist, video) => {
    console.log("postPlaylistCreate called",  )
    //user = {userid}
    //playlist.name, playlist.privacy
    const videoInfo = {
        videoId: video.videoId,
        videoName: video.title,
        thumbnailUrl: video.thumbnails.medium.url,
        thumbnails: video.thumbnails,
        channelName:video.channelTitle,
        createdAt: Date.now()
    }
    console.log("postPlaylistCreate videoInfo", videoInfo)
    try {

        const createUrl = baseUrl + '/playlist/create'
        const res = await axios.post(createUrl,
            {
                playlist: newPlaylist,
                videoInfo: videoInfo


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
        videoName: videoData.title,
        thumbnailUrl: videoData.thumbnails.default.url,
        thumbnails: videoData.thumbnails,

        createdAt: Date.now(),
        channelName: videoData.channelTitle
    }
    return res
}

const filterPlaylistArr = (video, playlistArr) => {
    
}

export const postAddVideoToPlaylist = async (video, playlistArr) => {


    if (!playlistArr.length) { return }
    const videoData = processVideoData(video)
    console.log("postAddVideoToPlaylist called", video, videoData, playlistArr)

    try {
        const updateUrl = baseUrl + `/playlist/update/`
        const playlistIdArr = playlistArr.map(o => o._id)
        const res = await axios.post(updateUrl,
            {
                videoData: videoData,
                playlistIdArr: playlistIdArr

            })
        console.log("postAddVideoToPlaylist success docid is", res.data)
        return res.data

    } catch (err) {
        throw ("err testAddVideoToPlaylist", err)
    }

}


export const getVideosOfPlaylist = async (playlistid, callback) => {
    try {
        //const playlistid = playlist._id
        const getUrl = baseUrl + `/playlist/${playlistid}/videos`
        const res = await axios.get(getUrl)
        console.log("getVideosOfPlaylist success videos are", res.data.videos)
        callback(res.data.videos)
        return 
    } catch (err) {
        throw ("testGetVideosOfPlaylist", err)
    }
}

export const getPlaylistDetail = async (playlistid, callback) => {
    try {
        //const playlistid = playlist._id
        const getUrl = baseUrl + `/playlist/${playlistid}/details`
        const res = await axios.get(getUrl)
        console.log("getPlaylistDetail success details are", res.data)
        callback(res.data.playlist)
        return 
    } catch (err) {
        throw ("testGetVideosOfPlaylist", err)
    }
}


export const postDeleteVideo = async ({playlistId, videoData}) => {
    try {
        const deleteUrl = baseUrl + `/playlist/video/delete`
        const postData =  {videoData:videoData, playlistId:playlistId}
        const res = await axios.post(deleteUrl,postData)
        console.log("postDeleteVideo success", res)
    } catch (err) {
        console.log("postDeleteVideo err", err)
    }
}