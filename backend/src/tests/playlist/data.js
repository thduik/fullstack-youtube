const videoDataArr = [
    {
        videoId: 'YJTae5ScvQA',
        videoName: 'Video0 - Distrion & Electro-Light - Drakkar [NCS Release]',
        thumbnailUrl: 'https://i.ytimg.com/vi/YJTae5ScvQA/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhAIF8oZTAP&rs=AOn4CLAjKXBADPj9RjLfdyWvTZGREiwh7w',
        createdAt: Date.now()
    },
    {
        videoId: 'i3vrmI_7zq4',
        videoName: 'Video1 - Devon Larrat New!! ANTI FLOP PRESS TRAINING',
        thumbnailUrl: 'https://i.ytimg.com/vi/i3vrmI_7zq4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCh3L6QqUk-yoM4OP_9nHNDvbZAYg',
        createdAt: Date.now()

    },
    {
        videoId: '5Hnico_qSUc',
        videoName: 'Video2 Empire of Angels',
        thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
        createdAt: Date.now()

    },
    {
        videoId: '6qTghUgMOeY',
        videoName: 'Video3 Two Steps From Hell - Impossible (feat. Merethe Soltvedt)',
        thumbnailUrl: 'https://i.ytimg.com/vi/6qTghUgMOeY/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhAIFwocjAP&rs=AOn4CLBUIjAEq1qKnnjl1YwhAdsLODj2_w',
        createdAt: Date.now()

    }
]

const testVideoArr = [
    [
        [videoDataArr[0],videoDataArr[1],videoDataArr[3]],
        [videoDataArr[2],videoDataArr[0],videoDataArr[3]]
    ]
]

const testUserArr = [
    {
        userid: 'testUserId',
        username: 'testUsername',
    }
]

const testPlaylistArr = [
    [
        {name:"playlist0u0",userid:testUserArr[0].userid, creatorName:testUserArr[0].username}, 
        {name:"playlist1u0",userid:testUserArr[0].userid, creatorName:testUserArr[0].username}
    ]
]










module.exports = { videoDataArr, testVideoArr, testPlaylistArr, testUserArr }
