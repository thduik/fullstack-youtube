const { redisClient, connectCache } = require('../connectDb')
const { createPlaylistCache, getPlaylistsOfUserFromCache } = require('../playlist')
const { DataGeneratorCP } = require('./data')


const main = async () => {
    try {
        await connectCache()
        await redisClient.flushAll()

        const dataGen = new DataGeneratorCP()

        const inputData = dataGen.createInputDataFor("createPlaylistCache")
        const res1 = await createPlaylistCache(inputData)
        const usaid = inputData.playlist._doc.userid
        const res2 = await getPlaylistsOfUserFromCache(usaid) // { isSet: true, data: playlistArr }
        
        // console.log("getPlaylistsOfUserFromCache res is", res2.data[0]['_id'])
        const playlistRes = res2.data[0]
        const expectedRes = dataGen.returnExpectedDataFor("getPlaylistsOfUserFromCache", {userid:usaid})
        
        Object.keys(playlistRes).forEach(o=>{console.log()})
        console.log("getPlaylistsOfUserFromCache res2", res2, expectedRes)
        await redisClient.flushAll()
    } catch (err) {
        await redisClient.flushAll()
        console.log("errMain", err)
    }
    await redisClient.flushAll()
    
}


main()