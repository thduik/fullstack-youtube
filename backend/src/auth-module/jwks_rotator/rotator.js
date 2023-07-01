const fs = require('fs');
// const jose = require('jose')
const jose = require('node-jose')
const path = require('path');
const { rotateTimerMs } = require('./config');

function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const keyStore = jose.JWK.createKeyStore();
var currPublicKey = null

if (!fs.existsSync(path.resolve(__dirname, '../jwt-keys/'))) {
  console.log("dir /jwt-keys do not exist creating dir")
  fs.mkdirSync(path.resolve(__dirname, '../jwt-keys/'))
}

const createAndWriteNewJWKSkey = async () => {
  try {


    
    const res = await keyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' })
    await delay(100)

    // console.log("createAndWriteNewJWKSkey complete")
    const jsonlol = keyStore.toJSON(true)
    const jsonkey = JSON.stringify(jsonlol, null, '  ')
    // const jsonkey = JSON.stringify(keyStore.toJSON(true), null, '  ')

    // fs.writeFileSync(
    //   path.resolve(__dirname, '../jwt-keys/public.json'), jsonkey
    // )
    currPublicKey = jsonkey
  } catch (err) {
    console.log("err createAndWriteNewJWKSkey", err)
    throw(err)
  }
}

const deleteOneKeyJwks = () => {
  const keyys = keyStore.all({})
  keyStore.remove(keyys[keyys.length - 1])
  return keyys.length + 1
}


const main = async () => {
  
  const OneMinuteMs = 60 * 1000
  await createAndWriteNewJWKSkey()
  await delay(300)
  setInterval(() => {
    deleteOneKeyJwks()
    createAndWriteNewJWKSkey()
  }, rotateTimerMs); //
}

const returnKeyStore = async () => {

  // const ks = fs.readFileSync('keys.json') 8080
  const ks = currPublicKey
  const keyStore = await jose.JWK.asKeyStore(ks.toString())
  return (keyStore.toJSON())
}

const returnJWKSkey = () => { //curr jsks public json key from JSON.stringify(keyStore.toJSON(), null, '  ')
  return currPublicKey
}


main()
module.exports = { returnJWKSkey, returnKeyStore }

