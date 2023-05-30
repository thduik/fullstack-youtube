import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {
    showSidebar:true,
    showMiniSidebar:true
    
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
        }
    }

})


export const { changeShowSidebar, changeShowMiniSidebar } = uiStateSlice.actions

export default uiStateSlice.reducer