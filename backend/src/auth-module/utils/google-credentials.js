const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()


// /**
//  * @description Function to decode Google OAuth token
//  * @param token: string
//  * @returns ticket object
//  */
// const getDecodedOAuthJwtGoogle = async token => {

//   const googleClientID = process.env.GOOGLE_CLIENT_ID
//   console.log("getDecodedOAuthJwtGoogle googleClientID is", googleClientID)
//   try {
//     const client = new OAuth2Client(googleClientID)

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: googleClientID,
//     })

//     return ticket
//   } catch (error) {
//     throw( { status: 500, data: error } )
//   }
// }

// module.exports = {getDecodedOAuthJwtGoogle}