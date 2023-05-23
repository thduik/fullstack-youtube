import axios from "axios"

// const httpsAgent = new httpsAgent({
    
//     rejectUnauthorized: true, // (NOTE: this will disable client verification)
//     cert: fs.readFileSync("./usercert.pem"),
//     key: fs.readFileSync("./key.pem"),
//     passphrase: "YYY"
//   })
  
export const testPost = async (url="/auth/google/login") => {
    
    
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

export const testGet = async () => {
    console.log("testPost called")
    try {
        const res = await axios.post("https://holysheet2831.hopto.org/api", {
            googleToken: "testTOken"
        })
        console.log("testPost success, res is", res)
    } catch (err) {
        console.log("testPost err, err is", err)
    }

}