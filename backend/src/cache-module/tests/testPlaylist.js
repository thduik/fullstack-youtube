const { redisClient, connectCache } = require('../connectDb')
const { createPlaylistCache, getPlaylistsOfUserFromCache, getAllVideosOfPlaylistFromCache } = require('../playlist')
const { DataGeneratorCP } = require('./data')
const { objectEqual } = require('./utils')
const {testStage1} = require('./testCases')

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const main = async () => {

    try {
        await delay(500)
        await connectCache()
        // await redisClient.flushAll()

        await delay(1000)
        const dataGen = new DataGeneratorCP()

        const inputData = dataGen.createInputDataFor("createPlaylistCache")
        const res1 = await createPlaylistCache(inputData)
        const usaid = inputData.playlist._doc.userid

        await delay(500)

        const res2 = await getPlaylistsOfUserFromCache(usaid) // { isSet: true, data: playlistArr }
        const res3 = await getPlaylistsOfUserFromCache(usaid)
        const res4 = await getPlaylistsOfUserFromCache(usaid)
        console.log("res2 is", res2, res3,res4 )
        const expectedRes = dataGen.returnExpectedDataFor("getPlaylistsOfUserFromCache", {userid:usaid}) 
        // console.log("getPlaylistsOfUserFromCache res2", res2, expectedRes ,objectEqual(res2.data[0],expectedRes[0]))
        await testStage1(res2, expectedRes)

        const playlistIdArr = res2.data.map(o=>o._id) 
        
        const res22 = await getAllVideosOfPlaylistFromCache(playlistIdArr[0])
        console.log("res22 is", playlistIdArr,res22)
        const expectedRes22 = dataGen.returnExpectedDataFor("getAllVideosOfPlaylistFromCache", {playlistId:playlistIdArr[0]})


        await redisClient.flushAll()
    } catch (err) {
        await redisClient.flushAll()
        console.log("errMain", err)
    }
    await redisClient.flushAll()
    
}


main()