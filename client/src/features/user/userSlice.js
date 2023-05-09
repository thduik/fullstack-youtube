import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    username: 'none', //string
    isLoggedIn: false,
    accessToken: 'none',
    subscriptions: [] //sidebar, implement later


}

export const userSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        login: (state, action) => {
            const { accessToken, username } = action.payload

            state.username = username
            state.isLoggedIn = true
            state.accessToken = accessToken
        },
        logout: (state) => {
            state.username = 'none'
            state.isLoggedIn = false
            state.accessToken = 'none'
        },
        receivedAccessToken: (state, action) => {
            const accessToken = action.payload.accessToken

            state.accessToken = accessToken
        }
    }

})


export const { login, logout, receivedAccessToken } = userSlice.actions

export default userSlice.reducer