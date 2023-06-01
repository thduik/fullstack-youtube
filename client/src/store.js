import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import appDataReducer from './features/appData/appDataSlice'
import uiStateReducer from './features/uiState/uiStateSlice'
import playlistReducer from './features/appData/playlistSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        appData: appDataReducer,
        uiState: uiStateReducer,
        playlist: playlistReducer
    }
})