import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    innerWidth:0
}

export const windowSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        changeInnerWidth: (state, action) => {
            console.log("reduxDispath changeInnerWidth", action.payload)
            state.innerWidth = action.payload
        }
    }
})


export const { changeInnerWidth } = windowSlice.actions
export default windowSlice.reducer