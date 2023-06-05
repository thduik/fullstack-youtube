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
const { testCreatePlaylist, testGetPlaylist,  cleanupTest, setupTest } = require("./src/tests/playlist");


app.post("/dcm", loginUser)

const loginUser = (req,res,next) => {
    const {email, password, newPassword } = req.body
    try {
        const data = await loginSchema.find({email})
        const hashedPassword = data.password
        const {success} = await bcrypt.compare(password, hashedPassword)
        const newHash = await bcrypt.hash(newPassword, 142)
        if (success && newHash) {
            loginSchema.update({email},{password:newPassword}) 
            const xxxData = await fetchXXXData()
        }
        res.cookie('concac','ditme')
    } catch (err) {
        console.log("loi con me m r", err)
    }
}

const testlolol = () => {
    const arr = [{x:3},{x:2},{x:-4},{x:6},{x:0}]
    arr.sort((a,b)=>a.x-b.x)
    console.log(arr)
}

const benchmarkCreatePlaylist = async (ntimes=1000) => {
    
    await setupTest()
    const dateStart = Date.now()
    await testCreatePlaylist()
    for (var i = 0; i < ntimes; i ++) {
        await testGetPlaylist()
    }
    const timeTook = ( Date.now() - dateStart )
    console.log(`test ${ntimes} times took ${timeTook} ms (or ${timeTook/1000}) seconds`)
    await cleanupTest()
    process.exit()
}

testlolol()