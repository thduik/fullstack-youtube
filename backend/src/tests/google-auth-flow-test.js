const { googleCheckCredentialsAndCreateTokens} = require("../auth-module/auth-manager")
const { deleteRefreshTokenOfUser, verifyJwtAccessToken  } = require("../auth-module/jwt-manager")

const connectDB = require("../db/connect-db")
const User = require("../models/User")

//jest + supertest
const assert = require('assert/strict');
const test = require('node:test')

const jwt = require('jsonwebtoken')
require('dotenv').config()



const mockGoogleId = 'testid'
const mockEmail = 'test@hackmail.com'

const testGoogleTokenVerify = async () => {

    try {

        await setupTest()
        await cleanupTest()
        const result = await googleCheckCredentialsAndCreateTokens("testToken", mockGoogleVerifyToken)
        //{userData:userData, accessToken:accessToken, refreshToken:refreshToken}
        testOutput(result)
        console.log("testGoogleTokenVerify completed result is:", result)

    } catch (err) {
        throw ("testGoogleTokenVerify error", err)

    }

    await cleanupTest()
    process.exit()
}

const setupTest = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI
        await connectDB(mongo_uri)
        return
    } catch (err) {
        throw ("setupTest error", err)
    }
}

const cleanupTest = async () => {
    try {
        const docs = await User.find({ googleid: mockGoogleId })
        if (docs.length > 0) {
            console.log("found document with test data that should have been deleted")
            const userid = docs[0].userid
            deleteRefreshTokenOfUser(userid)
        }
        await User.deleteMany({ googleid: mockGoogleId })
        return
    } catch (err) {
        //to force test to continue
        console.log("cleanupTest error", err)
        return
    }

}

const mockGoogleVerifyToken = async (token) => {
    //mock returning userData from googleToken
    const res = {
        id: mockGoogleId,
        email: mockEmail,
        verified_email: true,
        name: 'John Doe',
        given_name: 'John',
        family_name: 'Doe',
        picture_url: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
        locale: 'en'
    }
    return res
}

const testOutput = async (result) => {
    //{userData:userData, accessToken:accessToken, refreshToken:refreshToken}
    const userData = result.userData
    test('document userid exists', () => {
        return assert.notEqual(userData.googleid, 'undefined');
    });
    test('document name == John Doe', () => {
        return assert.equal(userData.name, 'John Doe');
    });
    test('document googleid == googleid', () => {
        return assert.equal(userData.googleid, mockGoogleId);
    });
    test('document email == testemail', () => {
        return assert.equal(userData.email, mockEmail);
    });

    
    test('document email == testemail', () => {
        return assert.equal(userData.email, mockEmail);
    });

    const accessToken = result.accessToken;
    try {
        //test accessToken verification
        const jwtDecoded = verifyJwtAccessToken(accessToken)
        console.log("jwtDecoded is", jwtDecoded)
        test('jwt sub is equal to userData.userid', () => {
            return assert.equal(jwtDecoded.sub, userData.userid);
        });
    }   catch (err) {
        throw("JWT verify testing failed")
    }
}


module.exports = {}

testGoogleTokenVerify()


