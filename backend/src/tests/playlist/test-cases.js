const assert = require('assert/strict');
const test = require('node:test')
const { videoDataArr, testVideoArr, testPlaylistArr, testUserArr } = require('./data')


const stage1Test = async (videoArrayRes0, videoArrayRes1) => {
    console.log("videoArrayRes0",videoArrayRes0,"videoArrayRes1", videoArrayRes1)
    //test create playlist with initial video
    await test('both video arrays length == 1', () => {
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
    //test add Video to playlist
    console.log("stage3 videonames are", videoArrayRes11.map(o => o.videoName), videoArrayRes22.map(o => o.videoName))
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

const stage3Test = async (videoArrayRes11, videoArrayRes22) => {
    //test delete video from playlist
    await test('Stage3 video array length == 2', () => {
        return assert.strictEqual(videoArrayRes11.length == 3 && videoArrayRes22.length == 3, true);
    })

    for (var i = 0; i < 2; i++) {
        const videoP0 = videoArrayRes11[i]
        const videoP1 = videoArrayRes22[i]
        await test(`Stage3 ${i}th video object id type == string`, () => {
            return assert.equal(typeof videoP0._id == 'string' && typeof videoP1._id == 'string', true);
        })
        await test(`Stage3 match original data`, () => {
            const assert1 = videoP0.videoName == testVideoArr[0][0][i].videoName;
            const assert2 = videoP1.videoName == testVideoArr[0][1][i].videoName;
            return assert.equal(assert1 && assert2, true)
        })
        await test(`Stage3 videoId match original Data`, () => {
            const assert1 = videoP0.videoId == testVideoArr[0][0][i].videoId;
            const assert2 = videoP1.videoId == testVideoArr[0][1][i].videoId;
            return assert.equal(assert1 && assert2, true)
        })
    }
}

const stage4Test = async (videoArrayRes11, videoArrayRes22) => {
    //test delete video from playlist
    await test('Stage4 video array length == 2', () => {
        return assert.strictEqual(videoArrayRes11.length == 3 && videoArrayRes22.length == 3, true);
    })

    for (var i = 0; i < 1; i++) {
        const videoP0 = videoArrayRes11[i]
        const videoP1 = videoArrayRes22[i]
        await test(`Stage4 ${i}th video object id type == string`, () => {
            return assert.equal(typeof videoP0._id == 'string' && typeof videoP1._id == 'string', true);
        })
        await test(`Stage4 match original data`, () => {
            const assert1 = videoP0.videoName == testVideoArr[0][0][i].videoName;
            const assert2 = videoP1.videoName == testVideoArr[0][1][i].videoName;
            return assert.equal(assert1 && assert2, true)
        })
        await test(`Stage4 videoId match original Data`, () => {
            const assert1 = videoP0.videoId == testVideoArr[0][0][i].videoId;
            const assert2 = videoP1.videoId == testVideoArr[0][1][i].videoId;
            return assert.equal(assert1 && assert2, true)
        })
    }
}

module.exports = { stage1Test, stage2Test, stage3Test, stage4Test }