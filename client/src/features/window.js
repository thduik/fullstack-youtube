import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    innerWidth:0,
    innerHeight:0
}

export const windowSlice = createSlice({
    name:'windowReducer',
    initialState,
    reducers: {
        changeInnerWidth: (state, action) => {
            console.log("reduxDispath changeInnerWidth", action.payload)
            state.innerWidth = action.payload
        },
        changeInnerHeight: (state, action) => {
            console.log("reduxDispath changeInnerHeight, action.payload")
            state.innerHeight = action.payload
        }
    }
})


export const { changeInnerWidth, changeInnerHeight } = windowSlice.actions
export default windowSlice.reducer