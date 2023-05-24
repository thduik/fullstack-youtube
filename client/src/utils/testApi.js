import axios from "axios"

// const httpsAgent = new httpsAgent({
    
//     rejectUnauthorized: true, // (NOTE: this will disable client verification)
//     cert: fs.readFileSync("./usercert.pem"),
//     key: fs.readFileSync("./key.pem"),
//     passphrase: "YYY"
//   })
export const testApi = async () => {
    await testPost()
    await testGet()
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