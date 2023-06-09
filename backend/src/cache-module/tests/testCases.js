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
            const playlistArr2 = resArray.filter(o=>o.userid == userId)[0].playlistArr
            
            if (!playlistArr2 || playlistArr2.length != playlistArr1.length) {throw("NOT OK testStage1 failed playlistArr2")}
            playlistArr1.sort((a,b)=>a.createdAt-b.createdAt)
            playlistArr2.sort((a,b)=>a.createdAt-b.createdAt)
            // console.log("testStage1 playlistArr1",playlistArr1, "playlistArr2",playlistArr2)
            for (var i = 0; i < playlistArr1.length; i++) {
                const p1 = playlistArr1[i]
                const p2 = playlistArr2[i];p2.count = parseInt(p2.count);p2.createdAt = parseInt(p2.createdAt)
                p2.isPrivate=parseInt(p2.isPrivate) ? true : false;p2.isUnlisted=parseInt(p2.isUnlisted) ? true : false
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
const testStage2 = (res, expectedRes) => {//both are array of videos
    // expectedRes._id =  expectedRes._id.toString()
    console.log("testStage2 expectedRes:", expectedRes, "res", res)
    const expResArr = expectedRes; expResArr.sort((a, b) => a.createdAt - b.createdAt)
    const resArr = res.data; resArr.sort((a, b) => a.createdAt - b.createdAt)

    if (res.data.length != expectedRes.length) { throw ("errtestStage2 length 2 arrats mismatch") }
    for (var i = 0; i < res.length; i++) {
        const video = res[i]
        const expVideo = expResArr[i]
        expVideo._id = expVideo._id.toString()
        console.log("testStage2 expVideo:", expVideo, "video", video)
        const testRes = objectEqual(video, expVideo)
        if (!testRes) { throw ("err testStage2 object not equal") }

    }
    console.log("OK testStage2 SUCCESS")
}
module.exports = { testStage1, testStage2 }