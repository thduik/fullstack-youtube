const { checkUserAgainstDbGoogleId } = require('../db/user-db')
const { createRefreshAndAccessToken } = require('./jwt-manager')
require('dotenv').config()
const test_mock = process.env.NODE_ENV == "development" &&  process.env.MOCK_AUTH == "true"
const { verifyAccessTokenGoogle } = test_mock ? require('./test-utils.js') : require('./utils/google-access-v1')

/*
*This function will
*/
const googleCheckCredentialsAndCreateTokens = async (googleToken, verifyGoogleToken=verifyAccessTokenGoogle) => {
    
    //verifyGoogleToken used for dependency injection for testing
    try {
        const realUserData = await verifyGoogleToken(googleToken.access_token)
        
        
        const userData = await checkUserAgainstDbGoogleId(googleid=realUserData.id, realUserData.email, realUserData)    
        const {accessToken, refreshToken } = createRefreshAndAccessToken(userData.userid)
        return {userData:userData, accessToken:accessToken, refreshToken:refreshToken}
        
    } catch(err) {
        
        throw("error googleCheckCredentialsAndCreateTokens", err) 
    }
}


module.exports = {
    googleCheckCredentialsAndCreateTokens
}