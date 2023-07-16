import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
// import ShortPlayerItem from "./ShortPlayerItem";
// import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
// import { arrayFirst, createDivArrFromShortArr, createShortItem } from "./utils";
import { useSearchParams } from "react-router-dom";
import ShortPlayerItem from "./ShortPlayerItem";
import useShortsPlayerData from "../../hooks/useShortsPlayerData";


const ShortsPlayer = ({ initialVideoId   = null, key = 1}) => { //curr videoId when mounted
    const { shortsArr } = useSelector((state) => state.shorts)
    const [searchParams, setSearchParams] = useSearchParams();
    const {snapType,currIdx, setCurrIdx,allowChangeIdx,hookHandleScroll} = useShortsPlayerData()
    const [allowScroll, setAllowScroll] = useState(true)
    // const ref = useRef(null)
    useEffect(() => {
        const currVidId = searchParams.get("v")
        if (!initialVideoId) {console.log('settingVideoIdsearchParams',currVidId);setCurrIdx(-1);setCurrIdx(0)} //3 lines to activate videoPLayer workflow
    },[searchParams])
    useEffect(()=>{
        if (!allowChangeIdx) {
            setTimeout(()=>{setAllowScroll(false)},600)
            setTimeout(()=>{setAllowScroll(true)},1400)
        }
    },[allowChangeIdx])
    const handleScroll = (e) => {
        hookHandleScroll(e)
    }
    const handleMouseUp = (e) => { }
   
    return (
        <div  style={{ width: "100%", height: "100%", overflowY: 'auto', position:'fixed' }} key={key} >
            {/* <VideoPlayer controls={1} videoId={videoId} loop={1} showInfo={0}/> */}
            <div 
             className='short-item-wrapper'
                style={{
                    position: 'relative', zIndex: 2, backgroundColor: "rgba(0,0,0,0)", overflowY: allowScroll ? 'auto' : 'hidden', 
                    width: "100%", height: "100%",  display: 'flex', flexDirection: 'column', alignItems: 'center'
                    , scrollSnapType: snapType,
                }} onScroll={handleScroll} onMouseUp={handleMouseUp}>

                {shortsArr.map((o, idx) => {
                    const imgUrl = o?.short?.thumbnails?.length ? o.short.thumbnails[0].url : createShortThumbnailUrl(o?.short?.videoId)
                    return < ShortPlayerItem idx={idx} currIdx={currIdx} videoId={o.short.videoId} key={idx} imgUrl={imgUrl} /> 
                })}
                <div style={{ scrollSnapStop: 'normal', scrollSnapAlign: 'start', height: '400px', width: '100%' }}><p>LOLLLL</p></div>
            </div>
        </div>




    )
}

export default ShortsPlayer;