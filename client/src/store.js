import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import appDataReducer from './features/appData/appDataSlice'
import uiStateReducer from './features/uiState/uiStateSlice'
import playlistReducer from './features/appData/playlistSlice'
import playlistStreamReducer from './features/appData/playlistStreamSlice'
import windowReducer  from './features/window'
export const store = configureStore({
    reducer: {
        user: userReducer,
        appData: appDataReducer,
        uiState: uiStateReducer,
        playlist: playlistReducer,
        playlistStream: playlistStreamReducer,
        windowRedux:windowReducer
    }
})