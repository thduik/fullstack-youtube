const { redisClient, connectCache } = require('../connectDb')
const { createPlaylistCache, getPlaylistsOfUserFromCache, getAllVideosOfPlaylistFromCache, addVideoToPlaylistsCache, deleteVideoFromPlaylistCache, deletePlaylistOfUserCache } = require('../playlist')
const { DataGeneratorCP } = require('./data')
const { objectEqual } = require('./utils')
const { testStage1, testStage2, stage3Test } = require('./testCases')

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const main = async () => {

    try {
        // await redisClient.flushAll()

        await delay(1000)
        const dataGen = new DataGeneratorCP()
        dataGen.createUserAndReturnUserId()
        dataGen.createUserAndReturnUserId()


        for (var j = 0; j < 2; j++) { //j = number of playlist created per user
            const inputData = dataGen.createInputDataFor("createPlaylistCache")//[ { userid: userId, data: { playlist:playlist, video:video } } ]
            console.log("inputDatalol", inputData)
            for (var i = 0; i < inputData.length; i++) {
                //for each data in inputData, create a playlist.
                // which means, create a new playlist for each user
                await createPlaylistCache(inputData[i].data)
                
            }
        }
        await delay(400)

        const useridArr = dataGen.returnCurrentUserids()
        const resArr = []//[{ isSet: true, data: playlistArr }]
        for (var i = 0; i < useridArr.length; i++) {
            const res2 = await getPlaylistsOfUserFromCache(useridArr[i])//{ isSet: true, data: playlistArr }
            resArr.push(res2)
        }
        const expectedRes = dataGen.returnExpectedDataFor("getPlaylistsOfUserFromCache")
        // console.log("getPlaylistsOfUserFromCache res2", res2, expectedRes ,objectEqual(res2.data[0],expectedRes[0]))
        await testStage1(resArr, expectedRes)


        const playlistIdArr = dataGen.returnCurrentPlaylistIds()
        const resArr11 = []
        for (var i = 0; i < playlistIdArr.length; i++) {
            const res22 = await getAllVideosOfPlaylistFromCache(playlistIdArr[i])
            resArr11.push(res22)
        }
        const expectedRes22 = dataGen.returnExpectedDataFor("getAllVideosOfPlaylistFromCache")

        // console.log("stage2 data is: res22",resArr11,"expectedRes", expectedRes22)
        await testStage2(resArr11, expectedRes22)


        for (var x = 0; x < 3; x++) {
            const inputData1 = dataGen.createInputDataFor("addVideoToPlaylistsCache") //[ {playlistId:string,video:{playlistId:,videoName:,videoId:,thumbnailUrl:,createdAt:,_id:}}]
            for (var i = 0; i < inputData1.length; i++) {
                // console.log("inputData1", inputData1[i])

                await addVideoToPlaylistsCache([inputData1[i].video]) //this takes in [ videoDoc ]
                await delay(300)
            }
        }

        await delay(500)
        const playlistIdArr1 = dataGen.returnCurrentPlaylistIds()
        const resArr111 = []
        for (var i = 0; i < playlistIdArr1.length; i++) {
            const res22 = await getAllVideosOfPlaylistFromCache(playlistIdArr1[i])
            // console.log("res2222", res22)
            resArr111.push(res22)
        }


        const expectedRes2222 = dataGen.returnExpectedDataFor("getAllVideosOfPlaylistFromCache")
        await testStage2( resArr111, expectedRes2222)

        for (var j = 0; j < 1;j++) {
            const deleteInputData = dataGen.createInputDataFor("deleteVideoFromPlaylistCache")
            for (var i = 0; i < deleteInputData.length; i ++) {
                // console.log("deleteInputData",deleteInputData[i].video)
                await deleteVideoFromPlaylistCache(deleteInputData[i])//{userid:playlist.userId,playlistId:playlistId, video:removedVideo}
            }
        }

        const playlistIdArr22 = dataGen.returnCurrentPlaylistIds()
        const resArr222 = []
        for (var i = 0; i < playlistIdArr22.length;i++) {
            const res22 = await getAllVideosOfPlaylistFromCache(playlistIdArr22[i])
            resArr222.push(res22)
        }
        const expectedRes333 = dataGen.returnExpectedDataFor("getAllVideosOfPlaylistFromCache") 
        
        await testStage2( resArr222, expectedRes333)

        for (var j = 0; j < 1;j++) {
            const deleteInputData = dataGen.createInputDataFor("deletePlaylistOfUserCache")
            for (var i = 0; i < deleteInputData.length; i ++) {
                const {userId, playlistId} = deleteInputData[i]
                // console.log("deleteInputDatadeletePlaylistOfUserCache",deleteInputData[i])
                await deletePlaylistOfUserCache({userId:userId,playlistId:playlistId })
            }
            
        }

        //with deletePlaylistOfUserCache called, should also test for remaining playlistIdArr

        const userIdArr = dataGen.returnCurrentUserids()
        const playlistTestRes = []
        for (var i = 0; i < userIdArr.length;i++) {
            const res222 = await getPlaylistsOfUserFromCache(userIdArr[i]) //{isSet:,data:[playlistDoc]}
            
            // console.log("playlistArrheheh", playlistTestRes)
            playlistTestRes.push(res222)
        }
        
        const expRes1234 = dataGen.returnExpectedDataFor("getPlaylistsOfUserFromCache")

        await testStage1(playlistTestRes, expRes1234) 
        
        const playlistIdArr2222 = [] 
        playlistTestRes.map(o=>playlistIdArr2222.push(...o.data.map(o=>o._id)) ) //fetch all the fckin playlistIds
        // console.log("playlistIdArr22", playlistIdArr2222)

        const resArr444 = []
        for (var i = 0; i < playlistIdArr2222.length;i++) {
            const res22 = await getAllVideosOfPlaylistFromCache(playlistIdArr2222[i])
            resArr444.push(res22)
        }

        const expectedRes444 = dataGen.returnExpectedDataFor("getAllVideosOfPlaylistFromCache") 
        
        await testStage2(resArr444, expectedRes444)

        await redisClient.flushAll()
    } catch (err) {
        await redisClient.flushAll()
        // console.log("errMain", err)
    }
    await redisClient.flushAll()

}


main()