# jwt verify process

1. sanitizeRequest(req.auth = {}) 
2. verifyJWT (accessToken) 
3. req.auth = userid 
4. resource check req.auth