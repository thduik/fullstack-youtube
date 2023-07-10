import { createSlice } from '@reduxjs/toolkit'
import { shortsApiRedux } from '../../middlewares/shortsApi'

//this slice manages all app data (search keyword)
const initialState = {

    isStreaming:false,
    // streamedShorts:null, //data of playlist being streamed, {object}
    shortsArr:null, //array of videos in playlist [array]


}

export const shortsSlice = createSlice({
    name:'shortsSlice',
    initialState,
    reducers: {
        changeIsStreaming: (state, action) => {//change isStreaming to true OR false
            state.isStreaming = action.payload
        },
        setShortsArray: (state, action) => {// change to null OR array of videos of currently streamed playlist 
            console.log("playlistStreamSlice setVideoArray called", action.payload)
            state.shortsArr = action.payload
        }
    }
    ,extraReducers: (builder) => {
        builder
          .addMatcher(shortsApiRedux.endpoints.getShorts.matchPending, (state, action) => {
            console.log('extraReducers shortsApiRedux pending', action)
          })
          .addMatcher(shortsApiRedux.endpoints.getShorts.matchFulfilled, (state, action) => {
            console.log('extraReducers shortsApiRedux fulfilled', action.payload)
            state.isStreaming = true
            state.shortsArr = action.payload.contents
          })
          .addMatcher(shortsApiRedux.endpoints.getShorts.matchRejected, (state, action) => {
            console.log('extraReducers rejected', action)
          })
      }
    })


export const { changeIsStreaming, setShortsArray } = shortsSlice.actions

export default shortsSlice.reducer