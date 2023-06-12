import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {

    playlists:[],
    selectedVideo:{} //for playlist creation menu only src/components/videoCard/PlaylistSelectMenu.jsx

}

export const playlistSlice = createSlice({
    name:'playlistReducer',
    initialState,
    reducers: {
        changeSelectedVideo: (state, action) => {
            state.selectedVideo = action.payload
        },
        setPlaylistArray: (state, action) => {
            console.log("setPlaylistArrayReduxSlice called", action.payload)
            state.playlists = action.payload
        },
        addPlaylist: (state, action) => {
            state.playlists.push(action.payload)
        }
    }

})


export const { changeSelectedVideo, setPlaylistArray, addPlaylist } = playlistSlice.actions

export default playlistSlice.reducer