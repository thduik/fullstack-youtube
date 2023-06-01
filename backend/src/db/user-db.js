const { userIdLengthMongoDb } = require('../configs/user-config')
const User = require('../models/User')
const { generateRandomString } = require('../utils/strings/generateRandomString')



const checkUserAgainstDbGoogleId = async (googleid, userEmail, userData) => {

    try {
        const res = await getUserInfoFromDb(googleid, userEmail)
        if (res.found == 0) { //user not found in db, create user
            const userDataRes = await createNewUserGoogleId(googleid, userEmail, userData)
            return userDataRes
        }
        if (res.found == 1) {
            // console.log("checkUserAgainstDbGoogleId success", res.userData)
            return res.userData
        }
    } catch (err) {
        throw ("checkUserAgainstDbGoogleId error:", err)
    }
}

const createNewUserGoogleId = async (googleid, userEmail, userData) => {
    //temporarily not caching, add cache later
    const userid = generateRandomString(userIdLengthMongoDb)
    const username = "user" + generateRandomString(10)
    const trollFaceUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Trollface_non-free.png/220px-Trollface_non-free.png"
    try {
        const doc = await User.create({
            userid: userid,
            googleid: googleid,
            name: userData.name,
            username: username,
            email: userEmail,
            givenname: userData.given_name,
            familyname: userData.family_name,
            pictureurl: userData.picture_url ?? trollFaceUrl
        })
        console.log("createNewUserGoogleId success doc is", doc)
        return doc
    } catch (err) {
        console.log("createNewUserGoogleId err", err)
    }
}
const returnUserInfoFromDbWithUserIdPromise = (userid) => {
    return User.find({userid:userid})
}
const getUserInfoFromDb = async (googleid, userEmail) => {
    //temporarily will fetch directly from db
    //later on should be from cache
    try {
        res = await User.find({ googleid: googleid })
        // console.log("getUserInfoFromCacheOrDb success")
        if (res.length == 0) {
            return { found: 0, message: 'user not created' }
        }
        const userData = res[0]
        // console.log("getUserInfoFromCacheOrDbGoogle success: ", res[0])
        return { found: 1, userData: userData }
    } catch (err) {
        throw ("getUserInfoFromCacheOrDb mongodb error", err)
    }
}

module.exports = { checkUserAgainstDbGoogleId, returnUserInfoFromDbWithUserIdPromise }