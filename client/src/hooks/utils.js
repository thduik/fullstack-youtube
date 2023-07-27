const createSampleComment = () => {
    const propsArr = 'authorProfileImageUrl, textDisplay, authorDisplayName, publishedAt, updatedAt, likeCount, textOriginaltotalReplyCount, canReply, isPublic, replyToken'.split(',').map(o=>o.trim())
    const resComment = {}
    propsArr.forEach(str=>{
        resComment[str] = 'test ' + str
    })
    return resComment
}

export const createSampleCommentArr = () => {
    return [1,2,3,4,5,6,7,8,8,9,,9,9].map(o=>createSampleComment())
}


console.log(createSampleCommentArr())