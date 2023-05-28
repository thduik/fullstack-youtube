import axios from "axios"
import { useDispatch } from "react-redux"
import { logout } from "../features/user/userSlice"


export const testApi = async () => {
    await testPost()
    await testGet()
}

export const cookieLogin = async (callback) => {
    const destUrl = 'https://holysheet2831.hopto.org/api/auth/cookie/login'
    try {
        const res = await axios.post(
            destUrl,{}
        )
        console.log("cookieLogin success, res is", res.data)
        callback(res.data)
    } catch (err) {
        console.log("cookieLogin err, err is", err)
    }
}

export const testCookies = async () => {
    const destUrl = "https://holysheet2831.hopto.org/api/cookies" 
    console.log("testPost called destUrl is", destUrl)
    try {
        const res = await axios.post(
            destUrl,{}
        )
        console.log("testCookies success, res is", res)
    } catch (err) {
        console.log("testCookies err, err is", err)
    }
}


export const logoutApp = async () => {
    const destUrl = "https://holysheet2831.hopto.org/api/logout" 
    console.log("testPost called destUrl is", destUrl)
    try {
        const res = await axios.post(
            destUrl, {type:200, error:0}
        )
        console.log("logoutApp success, res is", res)
    } catch (err) {
        console.log("logoutApp err, err is", err)
    }
}

const testPost = async (url="/test") => {
    
    
    const destUrl = "https://holysheet2831.hopto.org/api" + url
    console.log("testPost called destUrl is", destUrl)
    try {
        const res = await axios.post(
            destUrl, 
            {
            googleToken: "testTOken"
            }
        )

        console.log("testPost success, res is", res)
    } catch (err) {
        console.log("testPost err, err is", err)
    }

}

const testGet = async (url="/test") => {
    console.log("testPost called")
    try {
        const res = await axios.get("https://holysheet2831.hopto.org/api" + url)
        console.log("testPost success, res is", res)
    } catch (err) {
        console.log("testPost err, err is", err)
    }

}