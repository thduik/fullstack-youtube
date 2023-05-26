const postProcessDocArr = (playlistArr) => {
    for (var i = 0;i < playlistArr.length;i++) {
        const obj_id = playlistArr[i]._id
        playlistArr[i]._id = obj_id.toString()
    }
}

module.exports = {postProcessDocArr}