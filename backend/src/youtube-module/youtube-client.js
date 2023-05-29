const {google} = require('googleapis');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');

async function searchKeywordYoutube(keyword) {
    // const auth = await authenticate({
    //   keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    //   scopes: ['https://www.googleapis.com/auth/youtube'],
    // });
    // google.options({auth});
  
    const res = await youtube.search.list({
      part: 'id,snippet',
      q: 'keyword',
    });
    console.log(res.data);
    return res.data
  }
  
  if (module === require.main) {
    runSample().catch(console.error);
  }
  module.exports = searchKeywordYoutube;