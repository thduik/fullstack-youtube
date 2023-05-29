import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    username: 'none', //string
    name: 'none',
    pictureUrl:'none',
    isLoggedIn: false,
    email:'none',
    googleid:'none',
    subscriptions: [], //sidebar, implement later
    googleAccessToken:null
}
    
export const userSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, googleid, name, pictureUrl, userId, userName } = action.payload
            state.isLoggedIn = true 
            state.email = email ?? "defval"
            state.googleid = googleid ?? "defval"
            state.name = name ?? "defval"
            state.pictureUrl = pictureUrl ?? "defval"
            state.userId = userId ?? "defval"
            state.userName = userName ?? "defval"
            console.log("userSlice login called isLoggedIn:",state.isLoggedIn)

        },
        logout: (state) => {
            state.isLoggedIn = false
            state.email = 'none'
            state.googleid = 'none'
            state.name = 'none'
            state.pictureUrl = 'none'
            state.userId = 'none'
            state.userName = 'none'
            console.log("userSlice logout called isLoggedIn:",state.isLoggedIn)
        },
        setGoogleAccessToken: (state, action) => {
            state.googleAccessToken = action.payload
        }
    }

})


export const { login, logout, receivedAccessToken, setGoogleAccessToken } = userSlice.actions

export default userSlice.reducer