import { useEffect, useState } from "react";
import { memo } from "react";
import loadable from '@loadable/component'

import { shortHeight, shortMarginBottom, shortMarginTop, shortWidth } from "./dimensions";
// import ShortVideoPlayer from "./ShortVideoPlayer";
const ShortVideoPlayer = loadable(() => import('./ShortVideoPlayer'));


const ShortPlayerItem = ({ height = shortHeight, width = shortWidth
    , videoPlayer = null, imgUrl = null, videoId = null ,
    currIdx = null, idx}) => {
    const [showVideo, setShowVideo] = useState(false)
    const [playOnReady, setPlayOnReady] = useState(false)
    const [preventChange, setPreventChange] = useState(false)

    useEffect(()=>{
        
    })
    
    useEffect(()=>{ //render iframe for the selected shortPLayerItem and 2 adjacent ones as well, to enhance user experience
        console.log('ShortPlayerItem curridx', currIdx, 'idx', idx)
        const cond1 = currIdx == idx || currIdx == idx -1 || currIdx == idx + 1
        if (cond1 && !preventChange) {
           //make sure the main iframe is played immediately, the other 2 adjacent iframes will be paused
            setPlayOnReady(currIdx == idx)
            setPreventChange(true)
            setShowVideo(true)
            setTimeout(() => {
                setPreventChange(false)
            }, 800);
            return
        }
        setShowVideo(false)
    },[currIdx, idx])

    return (
        <div style={{
            height: height
            , width: width
            , backgroundColor: 'rgba(0,0,0,0)'
            ,marginTop:shortMarginTop
            ,marginBottom: shortMarginBottom
            , scrollSnapAlign:'start'
            , scrollSnapStop:'always'
        }}>
            {showVideo ? 
            <ShortVideoPlayer controls={1} videoId={videoId} playOnReady={playOnReady}/> 
            :
            <img src={imgUrl} height={'100%'} width={'100%'} style={{borderRadius:'20px'}}/>
            }
        </div>
    )
}

export default memo(ShortPlayerItem);