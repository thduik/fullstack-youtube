`npm install jwk-to-pem node-jose`


```

const correctTest = async () => {
    const payload = {
        exp: Math.floor((Date.now() + 24*60*60*1000) / 1000),
        iat: Math.floor(Date.now() / 1000),
        sub: 'userid12342328',
    }
    try {
        const token = await signJwksKey(payload)
        const res  = await verifyJwksToken(token)
        return token
    } catch(err) {
        console.log("NOT OK failed errorCorrectTest")
        throw(err)
    }
}

```