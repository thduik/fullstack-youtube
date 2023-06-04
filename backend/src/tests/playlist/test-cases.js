const assert = require('assert/strict');
const test = require('node:test')

const stage1Test = (playlistArrRes) => {
    await test('playlist object id type == string', () => {
        return assert.equal(typeof playlistArrRes[0]._id, 'string');
    })
    await test('playlist name == mockPlaylistName', () => {
        return assert.equal(playlistArrRes[0].playlistName, );
    })
    await test('playlist array length == 1', () => {
        return assert.strictEqual(playlistArrRes.length, 1);
    })
}