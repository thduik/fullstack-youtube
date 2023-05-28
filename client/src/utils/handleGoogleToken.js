import axios from "axios"
import { login, logout } from "../features/user/userSlice"

export const handleGoogleToken = async (token, callback) => {

    console.log("handleGoogleToken called, token is", token)
    const url="/auth/google/login"
    const destUrl = "https://holysheet2831.hopto.org/api" + url
    try {
        const res = await axios.post(destUrl, {
            googleToken: token
        })
        console.log("handleGoogleToken success, res is", res.data)
       callback(res)
    } catch (err) {
        console.log("handleGoogleToken err, err is", err)
    }

}

