import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {

    showSidebar:true,

}

export const uiStateSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        changeShowSidebar: (state, action) => {
            console.log("changeShowSidebar", state)
            state.showSidebar = action.payload
        }
    }

})


export const { changeShowSidebar } = uiStateSlice.actions

export default uiStateSlice.reducer