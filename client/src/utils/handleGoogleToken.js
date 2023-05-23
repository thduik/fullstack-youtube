import axios from "axios"

export const handleGoogleToken = async (token) => {
    console.log("handleGoogleToken called, token is", token)
    const url="/auth/google/login"
    const destUrl = "https://holysheet2831.hopto.org/api" + url
    try {
        const res = await axios.post(destUrl, {
            googleToken: token
        })
        console.log("handleGoogleToken success, res is", res.data)
    } catch (err) {
        console.log("handleGoogleToken err, err is", err)
    }

}

// export const testPost = async () => {
    
//     const url="/auth/google/login"
//     const destUrl = "https://holysheet2831.hopto.org/api" + url
//     console.log("testPost called destUrl is", destUrl)
//     try {
//         const res = await axios.post(destUrl, {
//             googleToken: 
//         }
//         )
//         console.log("testPost success, res is", res)
//     } catch (err) {
//         console.log("testPost err, err is", err)
//     }

// }