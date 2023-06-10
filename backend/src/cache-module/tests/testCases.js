const { objectEqual } = require("./utils")

const testStage1 = async (resArr, expectedArr) => {
    console.log("testStage1 data1", resArr, expectedArr)

    //only getPlaylistsOfUsers here


    //[ { userid: 'userId618796', playlistArr: [ [Object] ] } } ]

    try {
        const resArray = resArr.map((o) => {
            if (!o.isSet) { throw ("NOT OK testStage1 failed") }
            console.log('resArray', o.data)
            return { userid: o.data[0].userid, playlistArr: o.data }
        })

        //expectedArr and resArray: [ { userid: 'userId618796', playlistArr: [ [Object] ] } } ]
        for (var i = 0; i < expectedArr.length; i++) {
            const userId = expectedArr[i].userid
            const playlistArr1 = expectedArr[i].playlistArr
            const playlistArr2 = resArray.filter(o => o.userid == userId)[0].playlistArr

            if (!playlistArr2 || playlistArr2.length != playlistArr1.length) { throw ("NOT OK testStage1 failed playlistArr2") }
            playlistArr1.sort((a, b) => a.createdAt - b.createdAt)
            playlistArr2.sort((a, b) => a.createdAt - b.createdAt)
            // console.log("testStage1 playlistArr1",playlistArr1, "playlistArr2",playlistArr2)
            for (var i = 0; i < playlistArr1.length; i++) {
                const p1 = playlistArr1[i]
                const p2 = playlistArr2[i]; p2.count = parseInt(p2.count); p2.createdAt = parseInt(p2.createdAt)
                p2.isPrivate = parseInt(p2.isPrivate) ? true : false; p2.isUnlisted = parseInt(p2.isUnlisted) ? true : false
                console.log("p1p2", p1, p2)

                p1.count = parseInt(p1.count)
                p1.createdAt = parseInt(p1.createdAt)
                const res = objectEqual(p1, p2)
                // console.log("p1 == p2",res, p1.isPrivate)
                if (!res) { throw ("NOT OK testStage1 FAILED, objectEqual failed") }
            }
        }

        console.log("testStage1 SUCCESS")
    } catch (err) {
        console.log("err testStage1", err)
        throw ("testStage1 FAILED", err)
    }
}
const testStage2 = (res, expectedRes) => {
    console.log("testStage2", res, expectedRes)
    //expectedRes = { playlistId: '6483306986365dae1473ee6b', videoArr: [ [video] ] }
    const expResArr = expectedRes; expResArr.sort((a, b) => a.createdAt - b.createdAt)
    const resArrrr = res.map(o => {
        if (!o.isSet) { throw ("NOT OK testStage2 FAILED, isSet must be true") }
        return { playlistId: o.data[0].playlistId, videoArr: o.data }
    })

    expResArr.forEach(objj => {
        const resVideoArr = resArrrr.filter(j=>j.playlistId==objj.playlistId)[0].videoArr
        const expectedVideoArr = objj.videoArr
        expectedVideoArr.sort((a, b) => a.createdAt - b.createdAt)
        resVideoArr.sort((a, b) => a.createdAt - b.createdAt)
        // console.log("expResArr.forEach", resVideoArr,expectedVideoArr)
        if (expectedVideoArr.length != resVideoArr.length) { throw ("errtestStage2 length 2 arrats mismatch") }
        for (var i = 0; i < resVideoArr.length; i++) {
            const video = resVideoArr[i]
            const expVideo = expectedVideoArr[i]
            delete expVideo._id 
            
            console.log("testStage2 videoExpVideo:", expVideo, "video", video)
            //delete _id video from video obj
            
            const testRes = objectEqual(video, expVideo)
            if (!testRes) { throw ("err testStage2 object not equal") }

        }
    })



    console.log("OK testStage2 SUCCESS")
}

const stage3Test = (expData0, resData0) => { //[ {playlistId:string, videoArr:[videoDoc]} ]
    console.log("stage3Test")
    console.log("expData0",expData0)
    console.log("resData0",resData0)
    const resData1 = []
    resData0.map(o=>{
        if (!o.isSet || !o.data.length) {throw("NOT OK FAILED stage3Test o.isSet")}
        resData1.push({playlistId:o.data[0].playlistId, videoArr:o.data})
    })
    expData0.forEach(expPData=>{
        
        const resPData = resData1.filter(o=>o.playlistId==expPData.playlistId)[0]
        if (!resPData) { throw("NOT OK FAILED stage3Test FAILED !resPData")}
        
        const expVideoArray = expPData.videoArr
        const resVideoArray = resPData.videoArr
        // console.log("expVideoArray[0]",expVideoArray[0],"resVideoArray[0]",resVideoArray[0])
        if (expVideoArray.length != resVideoArray.length) {throw("NOT OK FAILED stage3Test FAILED videoArr length not match")}
        expVideoArray.sort( (a,b)=>a.createdAt-b.createdAt)
        resVideoArray.sort( (a,b)=>a.createdAt-b.createdAt)
        for (var i = 0;i < expVideoArray.length;i++) {
            const video1 = expVideoArray[i]
            const video2 = resVideoArray[i]
            //console.log("stage3Test video1",video1);console.log("stage3Test video2",video2)
            const resulz = objectEqual(video1, video2)
            if (!resulz) {throw("NOT OK FAILED stage3Test FAILED objectEqual failed")}
        }

    })

    console.log("OK testStage3 SUCCESS")

}

module.exports = { testStage1, testStage2, stage3Test }