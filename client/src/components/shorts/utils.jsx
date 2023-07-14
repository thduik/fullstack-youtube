import ShortPlayerItem from "./ShortPlayerItem"

export const createShortItem = ({ shortObj, idx, currIdx, videoPlayer = null }) => {
    // console.log('createShortItem', shortObj, idx, currIdx)
    // if (idx == currIdx) {
    //     return videoPlayer
    // }   
        const imgUrl = shortObj?.short?.thumbnails?.length ? shortObj.short.thumbnails[0].url : createShortThumbnailUrl(shortObj?.short?.videoId)//`https://i.ytimg.com/vi/${shortObj?.short?.videoId}/frame0.jpg`
    
    //const imgUrl = arrayFirst(shortObj?.short?.thumbnails) ? arrayFirst(shortObj.short.thumbnails).url : createShortThumbnailUrl(shortObj?.short?.videoId)//`https://i.ytimg.com/vi/${shortObj?.short?.videoId}/frame0.jpg`

    return < ShortPlayerItem key={idx} imgUrl={imgUrl} />
}

export const arrayFirst = (arr) => { 
    //get first element of array or return null if array is empty/null
    if (!arr || !arr.length) { return null }
    return arr[0]
}

export const createShortThumbnailUrl = (videoId) => `https://i.ytimg.com/vi/${videoId}/frame0.jpg`

export const createDivArrFromShortArr = (shortsArr, currIdx)=> {
    return shortsArr.map((o, idx) => {
        // console.log("divArray o", o)
        return createShortItem({ shortObj: o, idx: idx, currIdx: currIdx})
    }
    )
}