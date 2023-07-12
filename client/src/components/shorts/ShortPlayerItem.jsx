import { useEffect } from "react";
import { shortHeight, shortMarginBottom, shortMarginTop, shortWidth } from "./dimensions";


const ShortPlayerItem = ({ height = shortHeight, width = shortWidth
    , videoPlayer = null, imgUrl = null, videoId = null }) => {
    useEffect(() => { console.log("ShortPlayerItem", imgUrl) }, [imgUrl])
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
            {videoPlayer ? 
            null 
            :
            <img src={imgUrl} height={'100%'} width={'100%'} style={{borderRadius:'20px'}}/>
            }
        </div>
    )
}

export default ShortPlayerItem;