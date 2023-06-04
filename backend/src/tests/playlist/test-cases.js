const assert = require('assert/strict');
const test = require('node:test')
const { videoDataArr, testVideoArr, testPlaylistArr, testUserArr } = require('./data')


const stage1Test = async (videoArrayRes0, videoArrayRes1) => {
    await test('bot video arrays length == 1', () => {
        return assert.strictEqual(videoArrayRes0.length == 1 && videoArrayRes1.length == 1, true);
    })
    await test('video object id type == string', () => {
        return assert.equal(typeof videoArrayRes0[0]._id == 'string' && typeof videoArrayRes1[0]._id == 'string', true);
    })
    await test('video names GET from db matches video names from original data', () => {
        return assert.equal(videoArrayRes0[0].videoName == testVideoArr[0][0][0], videoArrayRes1[0].videoName == testVideoArr[0][1][0], true);
    })

    await test('3rd video of both playlists are the same', () => {
        return assert.equal(testVideoArr[0][0][2] == testVideoArr[0][1][2], true);
    })
}

const stage2Test = async (videoArrayRes11, videoArrayRes22) => {
    console.log("videoArrayRes11 videonames are", videoArrayRes11.map(o => o.videoName))
    console.log("videoArrayRes22 videonames are", videoArrayRes22.map(o => o.videoName))
    await test('video array length == 3', () => {
        return assert.strictEqual(videoArrayRes11.length == 3 && videoArrayRes22.length == 3, true);
    })

    for (var i = 0; i < 3; i++) {
        const videoP0 = videoArrayRes11[i]
        const videoP1 = videoArrayRes22[i]
        await test(`${i}th video object id type == string`, () => {
            return assert.equal(typeof videoP0._id == 'string' && typeof videoP1._id == 'string', true);
        })
        await test(`videoName match original data`, () => {
            const assert1 = videoP0.videoName == testVideoArr[0][0][i].videoName;
            const assert2 = videoP1.videoName == testVideoArr[0][1][i].videoName;
            return assert.equal(assert1 && assert2, true)
        })
        await test(`videoId match original Data`, () => {
            const assert1 = videoP0.videoId == testVideoArr[0][0][i].videoId;
            const assert2 = videoP1.videoId == testVideoArr[0][1][i].videoId;
            return assert.equal(assert1 && assert2, true)
        })
    }
}

module.exports = { stage1Test, stage2Test }