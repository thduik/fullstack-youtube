import { createSlice } from '@reduxjs/toolkit'
import { shortsApiRedux } from '../../middlewares/shortsApi'

//this slice manages all app data (search keyword)
const initialState = {

    isStreaming:false,
    // streamedShorts:null, //data of playlist being streamed, {object}
    shortsArr:[], //array of videos in playlist [array]
    isChannelShorts:false //either channelShorts or SuggestedShorts

}

export const shortsSlice = createSlice({
    name:'shortsSlice',
    initialState,
    reducers: {
        changeIsStreaming: (state, action) => {//change isStreaming to true OR false
            state.isStreaming = action.payload
        },
        setChannelShortsArray: (state, action) => {// change to null OR array of videos of currently streamed playlist 
            //called when navigating from channelShorts to shortDetail
            console.log("playlistStreamSlice setVideoArray called", action.payload)
            state.shortsArr = action.payload
            state.isStreaming = true
            state.isChannelShorts = true
        },
        setSuggestFirstShort: (state, action) => {//called by useSuggestedShorts when NOT navigating from channelShorts to shortDetail
            //the whole purpose is to set the short as the first element in shortsArray and normalize the shortsArray for shortDetail to use
            console.log("playlistStreamSlice setVideoArray called", action.payload)
            state.shortsArr = [action.payload]
            state.isStreaming = true
            state.isChannelShorts = false
        }
        ,deleteResetAll:(state, action) => {// change to null OR array of videos of currently streamed playlist 
            console.log("deleteResetAll shortsSlice called")
            state.shortsArr = []
            state.isStreaming = false
        }
    }
    ,extraReducers: (builder) => {
        builder
          .addMatcher(shortsApiRedux.endpoints.getChannelShorts.matchPending, (state, action) => {
            console.log('extraReducers shortsApiRedux pending', action)
          })
          .addMatcher(shortsApiRedux.endpoints.getChannelShorts.matchFulfilled, (state, action) => {
            console.log('extraReducers getChannelShorts fulfilled', action.payload)
            state.isStreaming = true
            state.shortsArr = action.payload.contents
            state.isChannelShorts = true
          })
          .addMatcher(shortsApiRedux.endpoints.getSuggestedShorts.matchFulfilled, (state, action) => {
            console.log('extraReducers getSuggestedShorts fulfilled', action.payload)
            let currShortArr = state.shortsArr
            const newArr = action.payload.data.map(o=>{return { 
                short:{  videoId:o.videoId, thumbnails:[{url:o.thumbnail[0].url}] }  // {short:{videoId:...}}
            } })
            currShortArr.push(...newArr)
            state.isStreaming = true
            state.shortsArr =  currShortArr
            state.isChannelShorts = false
          })
          //there's also matchRejected which is great for mutations
          
          
      }
    })


export const { changeIsStreaming, setChannelShortsArray, setSuggestFirstShort, deleteResetAll } = shortsSlice.actions

export default shortsSlice.reducer