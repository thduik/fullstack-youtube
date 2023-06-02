const { checkUserAgainstDbGoogleId } = require('../db/user-db')
const { createRefreshAndAccessToken } = require('./jwt-manager')
const { verifyAccessTokenGoogle } = require('./utils/google-access-v1')

/*
*This function will
*/
const googleCheckCredentialsAndCreateTokens = async (googleToken, verifyGoogleToken=verifyAccessTokenGoogle) => {
    
    //verifyGoogleToken used for dependency injection for testing
    try {
        const realUserData = await verifyGoogleToken(googleToken.access_token)
        // console.log("googleCheckCredentialsAndCreateTokens success", realUserData)
        //realUserData={id:'s',email:'s','name':'s',given_name: 's',family_name: 's',picture: 'https:/'}
        
        const userData = await checkUserAgainstDbGoogleId(googleid=realUserData.id, realUserData.email, realUserData)
        
        const {accessToken, refreshToken } = createRefreshAndAccessToken(userData.userid)
        // console.log("createRefreshAndAccessToken success")
        return {userData:userData, accessToken:accessToken, refreshToken:refreshToken}
        
        
        //generate accessToken + refreshToken and send them here
        //const {refreshToken, accessToken} = generateRefreshAndAccessToken()
    } catch(err) {
        
        throw("error googleCheckCredentialsAndCreateTokens", err) 
    }
}


module.exports = {
    googleCheckCredentialsAndCreateTokens
}