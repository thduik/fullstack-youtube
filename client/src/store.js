import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import appDataReducer from './features/appData/appDataSlice'
import uiStateReducer from './features/uiState/uiStateSlice'
import playlistReducer from './features/appData/playlistSlice'
import playlistStreamReducer from './features/appData/playlistStreamSlice'
import windowReducer  from './features/window'
import { shortsApiRedux } from './middlewares/shortsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { videoDetailApi } from './middlewares/videoDetailApi'

export const store = configureStore({
    reducer: {
        user: userReducer,
        appData: appDataReducer,
        uiState: uiStateReducer,
        playlist: playlistReducer,
        playlistStream: playlistStreamReducer,
        windowRedux:windowReducer,
        [shortsApiRedux.reducerPath]: shortsApiRedux.reducer
        ,[videoDetailApi.reducerPath]: videoDetailApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([shortsApiRedux.middleware, videoDetailApi.middleware]),
})


setupListeners(store.dispatch)

