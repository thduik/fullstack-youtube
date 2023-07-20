import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
import loadable from '@loadable/component'

// import ShortPlayerItem from "./ShortPlayerItem";
// import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
// import { arrayFirst, createDivArrFromShortArr, createShortItem } from "./utils";
import { useSearchParams } from "react-router-dom";
import ShortPlayerItem from "./ShortPlayerItem";
import useShortsPlayerData from "../../hooks/useShortsPlayerData";
import { isDevelopment } from "../../configs/appConfig";
import ShortsMenu from "./ShortsMenu";
const TestShorts = loadable(() => import('../testComponent/testShorts'));

const scrollSnapAlign = 'end'
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
        <div  style={{ width: "100%", height: "100%", overflowY: 'auto', position:'fixed', backgroundColor:'green', zIndex:-1 }} key={key} >
            
            {/* {isDevelopment ? <TestShorts currIdx={currIdx}/> : null} */}
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
                {/* <div style={{ scrollSnapStop: 'always', scrollSnapAlign: scrollSnapAlign, minHeight: '100px', width: '100%' }}><p>LOLLLL</p></div> */}
                <ShortsMenu key={1} data={null} />
            </div>
        </div>




    )
}

export default ShortsPlayer;