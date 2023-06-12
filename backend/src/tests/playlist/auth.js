const axios = require('axios')
const baseUrl = 'http://localhost:4444'

const loginWithGoogleTest = async (userData) => {
    console.log("loginWithGoogleTest called ", userData)
    try {
        const loginUrl = baseUrl + '/auth/google/login'
        const res = await axios.post(loginUrl,
            {
                googleToken:{
                    access_token:userData
                }
            })
        console.log("loginWithGoogleTest", res.cookies)
    } catch (err) {
        throw("err loginWithGoogleTest", err)
    }
}

module.exports = {loginWithGoogleTest}