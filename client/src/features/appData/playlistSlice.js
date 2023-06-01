import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {

    playlists:[],
    selectedVideo:{}

}

export const playlistSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        changeSelectedVideo: (state, action) => {
            state.selectedVideo = action.payload
        }
    }

})


export const { changeSelectedVideo } = playlistSlice.actions

export default playlistSlice.reducer