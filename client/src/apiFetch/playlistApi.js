import axios from 'axios'

const baseUrl = 'https://holysheet2831.hopto.org/api'

export const getPlaylist = async () => {
    //return array of playlist objects
    try {
        const getUrl = baseUrl + '/playlist'
        const res = await axios.get(getUrl)
        // console.log("testGetPlaylist success playlists are", res.data.playlists)
        return res.data.playlists
    } catch (err) {
        console.log("err getPlaylist", err)
    }
   
}

export const postPlaylistCreate = async () => {
    const createUrl = baseUrl + '/playlist/create'
    const res = await axios.post(createUrl,
        {
            playlist: {
                playlistName: mockPlaylistName,
                userid: mockUserId,
                userName: mockUsername,
                isPrivate: false
            },
            videoInfo: videoDataArr[0]
            //{videoId,videoName,thumbnailUrl,createdAt}

        })
    // console.log("testPostAxios success docid is", res.data)
    return res.data
}