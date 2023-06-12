const { generateRandomString } = require("../../utils/strings/generateRandomString")
const { createGmailData } = require("./utils")

const userDataArr = []
const userIdToPlaylistId = new Map()



const generateUserDataForGoogleTesting = () => {
    const userData = createGmailData()//{id,email,given_name,family_name,name,picture,locale}
    userDataArr.push(userData)
    return userData
}

module.exports = {generateUserDataForGoogleTesting}