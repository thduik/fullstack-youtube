const { redisClient, connectCache } = require('../connectDb')
const { createPlaylistCache, getPlaylistsOfUserFromCache, getAllVideosOfPlaylistFromCache } = require('../playlist')
const { DataGeneratorCP } = require('./data')
const { objectEqual } = require('./utils')
const {testStage1,testStage2} = require('./testCases')

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const main = async () => {

    try {
        // await redisClient.flushAll()

        await delay(1000)
        const dataGen = new DataGeneratorCP()
        dataGen.createUserAndReturnUserId()
        const inputData = dataGen.createInputDataFor("createPlaylistCache")
        console.log("inputDatalol", inputData)//[ userid: 'userId593476', data: { playlist: [Object], video: [Object], userId: 'userId593476' }]
        for (var i = 0; i < inputData.length; i++) {
            //for each data in inputData, create a playlist.
            // which means, create a new playlist for each user
            await createPlaylistCache(inputData[i].data)
        }
        await delay(500)

        const userids = dataGen.returnCurrentUserids()
        const res2 = await getPlaylistsOfUserFromCache(usaid) // { isSet: true, data: playlistArr }
        const res3 = await getPlaylistsOfUserFromCache(usaid)
        const res4 = await getPlaylistsOfUserFromCache(usaid)
        console.log("res2 is", res2, res3,res4 )
        const expectedRes = dataGen.returnExpectedDataFor("getPlaylistsOfUserFromCache", {userid:usaid}) 
        // console.log("getPlaylistsOfUserFromCache res2", res2, expectedRes ,objectEqual(res2.data[0],expectedRes[0]))
        await testStage1(res2, expectedRes)

        const playlistIdArr = res2.data.map(o=>o._id) 
        
        const res22 = await getAllVideosOfPlaylistFromCache(playlistIdArr[0])
        
        const expectedRes22 = dataGen.returnExpectedDataFor("getAllVideosOfPlaylistFromCache", {playlistId:playlistIdArr[0]})

        console.log("stage2 data is: res22",res22,"expectedRes", expectedRes22)
        await testStage2(res22, expectedRes22)


        const inputData1 = createInputDataFor("addVideoToPlaylistsCache",{count:3})
        

        await redisClient.flushAll()
    } catch (err) {
        await redisClient.flushAll()
        console.log("errMain", err)
    }
    await redisClient.flushAll()
    
}


main()