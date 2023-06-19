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
const obj = {
    ss: 'aa',
    //isPrivate: true,
    //isUnlisted: false,
    createdAt: 1686056592950,
    count: 1,
    __v: 0
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const convertDateDiff = (dateIso) => { //dateIso = publishedAt, 
//     //find difference between Date.now and published at, 
//     //published less than 24 hours ago, show hours ago. less than 7 days, show days ago. less than 30 days, show weeks ago. less than 365 days. show months ago.

//     const timeDiffSec = (Date.now() - Date.parse(dateIso)) / 1000
//     if (timeDiffSec < 60) { return "Just now" }
//     if (timeDiffSec < 3600) { return `${timeDiffSec / 60} minutes ago` }
//     const timeDiffHours = timeDiffSec / 3600
//     if (timeDiffHours < 24) { return `${timeDiffSec / 60} hours ago` }
//     const timeDiffDays = timeDiffHours / 24
//     if (timeDiffDays < 7) { return `${Math.floor(timeDiffDays)} days ago` }
//     if (timeDiffDays < 30) { return `${Math.floor(timeDiffDays / 7)} weeks ago` }
//     if (timeDiffDays < 365) { return `${Math.floor(timeDiffDays / 30)} months ago` }
//     return `${Math.floor(timeDiffDays / 365)} years ago`
// }

const convertDateDiff = (dateIso) => { //dateIso = publishedAt, 
    //find difference between Date.now and published at, 
    //published less than 24 hours ago, show hours ago. less than 7 days, show days ago. less than 30 days, show weeks ago. less than 365 days. show months ago.

    const timeDiffSec = (Date.now() - Date.parse(dateIso)) / 1000
    if (timeDiffSec < 60) { return "Just now" }
    if (timeDiffSec < 3600) { return `${Math.round(timeDiffSec / 60 * 100)/100} minutes ago` }
    const timeDiffHours = timeDiffSec / 3600
    if (timeDiffHours < 24) { return `${Math.round(timeDiffHours * 100)/100} hours ago` }
    const timeDiffDays = timeDiffHours / 24
    if (timeDiffDays < 7) { return `${Math.round(timeDiffDays * 100) / 100} days ago` }
    if (timeDiffDays < 30) { return `${Math.floor(timeDiffDays / 7)} weeks ago` }
    if (timeDiffDays < 365) { return `${Math.floor(timeDiffDays / 30)} months ago` }
    return `${Math.floor(timeDiffDays / 365)} years ago`
}

const testlolol = async () => {
    //1 hour = 3600000 ms
    const o = {id:"fuck"}
    console.log(`https://i.ytimg.com/vi/${o.id}/hqdefault.jpg`)
    return
    const timeMs = Date.now() - Date.parse("2023-06-02T02:00:00.000Z") 
    const dateDiff = convertDateDiff("2023-06-02T02:00:00.000Z" )
    //console.log(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString());
    console.log(timeMs,dateDiff)
    console.log(convertDateDiff("2023-05-02T02:00:00.000Z" ))
    console.log(convertDateDiff("2023-01-02T02:00:00.000Z" ))
    console.log(convertDateDiff("2022-01-02T02:00:00.000Z" ))
    return
    console.log("\\\\")
    await connectCache()
    await redisClient.hSet("key1", obj)
    const res1 = await redisClient.sAdd("set1", "key1")
    const res2 = await redisClient.sAdd("set1", "key2")
    const r1 = await redisClient.sIsMember("set1","key2")
    const r2 = await redisClient.sIsMember("set1","key4")
    console.log("r1",r1, "r2", r2)
    if (!r2) {console.log("r2 not ok")}
    if (r1) {console.log("r1 ok")}
    console.log("res1", res1, "res2", res2)
    return


    for (var i = 0; i < 5; i++) {



        try {

            
            
            var keylol = "key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11"
            for (var i = 0;i<3;i++) {keylol += keylol}

            const date0 = Date.now()
            
            await redisClient.hSet(keylol, obj)

            for (var i = 0; i < 30000; i++) {
                await redisClient.hGetAll(keylol)
            }
            //30k times, 5500ms

            console.log("took", Date.now() - date0, "ms")
        } catch (err) {
            console.log("errrr", err)
        }

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