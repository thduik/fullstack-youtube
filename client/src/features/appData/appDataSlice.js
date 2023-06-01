import { createSlice } from '@reduxjs/toolkit'

//this slice manages all app data (search keyword)
const initialState = {

    selectedCategory:'New',
    

}

export const appDataSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        changeSelectedCategory: (state, action) => {
            const { selectedCategory } = action.payload
            state.selectedCategory = selectedCategory
            
        }
    }

})


export const { changeSelectedCategory } = appDataSlice.actions

export default appDataSlice.reducer