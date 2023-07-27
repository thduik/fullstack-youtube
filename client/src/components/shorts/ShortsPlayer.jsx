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
import { mainPaddingTop } from "./dimensions";
const TestShorts = loadable(() => import('../testComponent/testShorts'));

const scrollSnapAlign = 'end'
const height = '100%'
const paddingTop = mainPaddingTop
const ShortsPlayer = ({ initialVideoId   = null, key = 1}) => { //curr videoId when mounted
    const { shortsArr } = useSelector((state) => state.shorts)
    const [searchParams, setSearchParams] = useSearchParams();
    const {snapType,currIdx, setCurrIdx,allowChangeIdx,hookHandleScroll} = useShortsPlayerData()
    const [allowScroll, setAllowScroll] = useState(true)
    // const ref = useRef(null)
    useEffect(() => {
        const currVidId = searchParams.get("v")
        if (!initialVideoId) {console.log('settingVideoIdsearchParams',currVidId)
        //setCurrIdx(-1);setCurrIdx(0)
    } //3 lines to activate videoPLayer workflow
    },[searchParams])

   
    const handleScroll = (e) => {
        console.log('scroll handle called ShortsPlayer')
        hookHandleScroll(e)
        setAllowScroll(false)
        setTimeout(()=>{setAllowScroll(true)},1000)
    }
    const handleMouseUp = (e) => { }
   
    return (
        <div 
          style={{ width: "100%", height: "100%", overflowY: 'auto', position:'fixed', backgroundColor:'green', zIndex:10, paddingTop:paddingTop }} key={key} >
            
            {isDevelopment ? <TestShorts currIdx={currIdx}/> : null}
            <div 
             className='short-item-wrapper'
                style={{
                    position: 'relative', zIndex: 2, backgroundColor: "rgba(0,0,0,0)", overflowY:'auto' //allowScroll ? 'auto' : 'hidden'
                    ,width: "100%", height: height,   alignItems: 'center'
                    , scrollSnapType: snapType, display: 'flex', flexDirection: 'column',
                    pointerEvents: allowScroll ? 'all' : 'none'
                }} onScroll={handleScroll} onMouseUp={handleMouseUp}>

                {shortsArr.map((o, idx) => {
                    const imgUrl = o?.short?.thumbnails?.length ? o.short.thumbnails[0].url : createShortThumbnailUrl(o?.short?.videoId)
                    return < ShortPlayerItem idx={idx} currIdx={currIdx} videoId={o.short.videoId} key={idx} imgUrl={imgUrl} /> 
                })}
                {/* <div style={{ scrollSnapStop: 'always', scrollSnapAlign: scrollSnapAlign, minHeight: '100px', width: '100%' }}><p>LOLLLL</p></div> */}
            </div>
        </div>




    )
}

export default ShortsPlayer;