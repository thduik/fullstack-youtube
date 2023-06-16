import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {

    isStreaming:false,
    streamedPlaylist:null, //data of playlist being streamed, {object}
    videoArr:null, //array of videos in playlist [array]


}

export const playlistStreamSlice = createSlice({
    name:'playlistStreamReducer',
    initialState,
    reducers: {
        changeIsStreaming: (state, action) => {//change isStreaming to true OR false
            state.isStreaming = action.payload
        },
        setVideoArray: (state, action) => {// change to null OR array of videos of currently streamed playlist 
            console.log("playlistStreamSlice setVideoArray called", action.payload)
            state.videoArr = action.payload
        },
        setStreamedPlaylist: (state, action) => {// change to null OR {playlistObject}, which is the playlist currently streamed
            state.streamedPlaylist = action.payload
        },
        deleteVideoFromPlaylist: (state, action) => {
            const {videoId,playlistId } = action.payload
            const videoArross = state.videoArr.filter(o=>o.videoId != videoId)
            state.videoArr = videoArross
        }
    }

})


export const { changeIsStreaming, setVideoArray, setStreamedPlaylist, deleteVideoFromPlaylist } = playlistStreamSlice.actions

export default playlistStreamSlice.reducer