const postProcessDocArr = (playlistArr) => {
    for (var i = 0;i < playlistArr.length;i++) {
        const obj_id = playlistArr[i]._id
        playlistArr[i]._id = obj_id.toString()
    }
}

const converUserDataToJson = (userData) => {
    const res = {
        userId: userData.userid,
        googleid: userData.googleid,
        name: userData.name,
        userName: userData.username,
        email: userData.email,
        pictureUrl: userData.pictureurl
    }
    return res
}

module.exports = {postProcessDocArr, converUserDataToJson}