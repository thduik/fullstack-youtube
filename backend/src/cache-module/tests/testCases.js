const { objectEqual } = require("./utils")

const testStage1 = async (data1, data2) => {
    
    //only getPlaylistsOfUsers here
    try {
    const playlistArr1 = data1.data
    const playlistArr2 = data2
    // console.log("testStage1 playlistArr1",playlistArr1, "playlistArr2",playlistArr2)
    for (var i = 0; i < playlistArr1.length; i++) {
        const p1 = playlistArr1[i]
        const p2 = playlistArr2[i]
        p1.isPrivate = p1.isPrivate == '1' ? true : false;p1.isUnlisted = p1.isUnlisted == '1' ? true : false
        p1.count = parseInt(p1.count)
        p1.createdAt = parseInt(p1.createdAt)
        const res = objectEqual(p1,p2)
        // console.log("p1 == p2",res, p1.isPrivate)
        if (!res) {throw("NOT OK testStage1 FAILED, objectEqual failed")}
    }
    console.log("testStage1 SUCCESS")
    } catch (err) {
        throw("testStage1 FAILED", err)
    }
}
const testStage2 = (res,expectedRes) => {//both are array of videos
    // expectedRes._id =  expectedRes._id.toString()
    console.log("testStage2 expectedRes:",expectedRes,"res",res )
    const expResArr = expectedRes; expResArr.sort((a,b)=> a.createdAt - b.createdAt)
    const resArr = res.data; resArr.sort((a,b)=> a.createdAt - b.createdAt)

    if ( res.data.length != expectedRes.length ) {throw("errtestStage2 length 2 arrats mismatch")}
    for (var i = 0; i < res.length;i++){
        const video = res[i]
        const expVideo = expResArr[i]
        expVideo._id = expVideo._id.toString()
        console.log("testStage2 expVideo:",expVideo,"video",video )
        const testRes = objectEqual(video, expVideo)
        if (!testRes) {throw("err testStage2 object not equal")}
       
    }
    console.log("OK testStage2 SUCCESS")
}
module.exports = {testStage1,testStage2}