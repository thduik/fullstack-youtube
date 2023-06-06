// const { generateRandomString } = require("./src/utils/strings/generateRandomString");

// var myMap = new Map();

// const test_count = 1 * Math.pow(10, 6)//10 thousand




// const testlol = async () => {
//     const startTime = Date.now()
//     for (var i = 0; i <  test_count; i++) {
//        const res = generateRandomString(30)
//     }

//     console.log("test took", Date.now() - startTime, "ms")
// }

const loginSchema = {}
const bcrypt = {}

var ObjectID = require("bson-objectid");
const { testCreatePlaylist, testGetPlaylist, cleanupTest, setupTest } = require("./src/tests/playlist");


const redis = require('redis')

let redisClient;

const connectCache = async () => {

    try {
        redisClient = redis.createClient();
        await redisClient.connect();
    } catch (err) {
        throw ("err connectCache", err)
    }

};


const testlolol = async () => {
    try {
        const jsonObj = {
            name: 'playlist2',
            thumbnail: 'abssudhsjdsasdasd',
            //fuck: ['abssudhsjdsasdasd','abssudhsjdsasdasd','abssudhsjdsasdasd','abssudhsjdsasdasd','abssudhsjdsasdasd','abssudhsjdsasdasd','abssudhsjdsasdasd','abssudhsjdsasdasd']
        }

        await connectCache()

        const ntimes = 800000

        const add2 = await redisClient.sAdd('set11sds2', 'asds222d')
        
        const arr = ['adsdadadsaasdasd','adsdadadsaasdasdadsdadadsaasdasdb','cadsdadadsaasdasdadsdadadsaasdasdadsdadadsaasdasd','dadsdadadsaasdasdadsdadadsaasdasdadsdadadsaasdasd']
        for (var i = 0;i<ntimes;i++) {arr.push(arr[2]) }
        arr.map((s)=>redisClient.sAdd('set112', s))


        const res2 = await redisClient.sMembers('set112')

        console.log("set of key set112 values are", res2)
    } catch (err) {
        console.log("errrr", err)
    }
}

const benchmarkCreatePlaylist = async (ntimes = 1000) => {

    await setupTest()
    const dateStart = Date.now()
    await testCreatePlaylist()
    for (var i = 0; i < ntimes; i++) {
        await testGetPlaylist()
    }
    const timeTook = (Date.now() - dateStart)
    console.log(`test ${ntimes} times took ${timeTook} ms (or ${timeTook / 1000}) seconds`)
    await cleanupTest()
    process.exit()
}

testlolol()