const { generateRandomString } = require("../../utils/strings/generateRandomString")


const createGmailData = () => {
    const id = "googleid" + generateRandomString(10)
    const email = generateRandomString(8) + "@gmail.com"
    const given_name = "Given" +  generateRandomString(6)
    const family_name = "Family" + generateRandomString(6)
    const name = given_name + " " + family_name
    const picture = "https//" + generateRandomString(10)
    return {
        id: id,
        email: email,
        verified_email: true,
        name: name,
        given_name: given_name,
        family_name: family_name,
        picture: picture,
        locale: 'en'
    }

}

module.exports = {createGmailData}