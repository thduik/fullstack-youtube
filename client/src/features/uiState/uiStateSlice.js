import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {
    showSidebar:true,
    showMiniSidebar:true,
    showPlaylistSelectDropdown: false
    
}

export const uiStateSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        changeShowSidebar: (state, action) => {
            state.showSidebar = action.payload
        },
        changeShowMiniSidebar: (state, action) => {
            state.showMiniSidebar = action.payload
        },
        changeShowPlaylistSelectDropdown: (state, action) => {
            console.log("changeShowPlaylistSelectDropdown redux", action.payload)
            state.showPlaylistSelectDropdown = action.payload
        }
    }

})


export const { changeShowSidebar, changeShowMiniSidebar, changeShowPlaylistSelectDropdown } = uiStateSlice.actions

export default uiStateSlice.reducer