var google = require('googleapis').google;
var OAuth2 = google.auth.OAuth2;

const mockData = {
    id: '212',
    email: 'lissss8@gmail.com',
    verified_email: true,
    name: 'Linh Nguyen',
    given_name: 'Linh',
    family_name: 'Nguyen',
    picture: 'https://lh3.googleusercontent.com/a/AAcHTtfXSmv8aonRPOAvV_W2mG39KEvt4JnLiOu_zmNF=s96-c',
    locale: 'en'
  }

  
const verifyAccessTokenGoogle = async (accessToken) => {
    let oauth2Client = new google.auth.OAuth2();    
    oauth2Client.setCredentials({ access_token: accessToken });
    var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });
    try {
        const res = await oauth2.userinfo.get(); 
        console.log("verifyAccessTokenGoogle success res.data is",res.data)
        return res.data
    } catch (err) {
        throw("verifyAccessTokenGoogle error", err)
    }
   
}

module.exports = {verifyAccessTokenGoogle}
