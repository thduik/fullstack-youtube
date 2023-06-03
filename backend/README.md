# jwt verify process

1. sanitizeRequest(req.auth = {}) 
2. verifyJWT (accessToken) 
3. req.auth = userid 
4. resource check req.auth


req.auth is set by authModule

resources endpoints check req.auth.userid (that is set by authModule) and grant resources accordingly