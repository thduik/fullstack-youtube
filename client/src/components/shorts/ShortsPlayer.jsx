import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
// import ShortPlayerItem from "./ShortPlayerItem";
import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
import { arrayFirst, createDivArrFromShortArr, createShortItem } from "./utils";
import { useSearchParams } from "react-router-dom";
import ShortPlayerItem from "./ShortPlayerItem";
import useShortsPlayerData from "../../hooks/useShortsPlayerData";


const ShortsPlayer = ({ initialVideoId   = null, key = 1}) => { //curr videoId when mounted
    const { shortsArr, isStreaming, isChannelShorts } = useSelector((state) => state.shorts)
    const [searchParams, setSearchParams] = useSearchParams();
    const {snapType} = useShortsPlayerData()
    const [currIdx, setCurrIdx] = useState(0)
    const [divArr, setDivArr] = useState([])
    const {innerWidth , innerHeight} = useSelector((state) => state.windowRedux)
    const ref = useRef(null)
    const [allowChangeIdx, setAllowChangeIdx] = useState(true)
    useEffect(() => {
        const currVidId = searchParams.get("v")
        if (!initialVideoId) {console.log('settingVideoIdsearchParams',currVidId);setVideoId(currVidId);setCurrIdx(-1);setCurrIdx(0)} //3 lines to activate videoPLayer workflow
    },[searchParams])
    
    
    useEffect(() => {
        console.log("initialVideoId", initialVideoId)
        setVideoId(initialVideoId)
    }, [initialVideoId])
    useEffect(() => {
        if (!shortsArr || !shortsArr.length || currIdx < 0 || currIdx >= shortsArr.length) { 
            console.log("currIdxShortsPlayer useEfect ", currIdx, shortsArr.length, shortsArr)
            return }
        console.log("currIdxShortsPlayer useEfect ", currIdx, arrayFirst(shortsArr[currIdx]?.short?.thumbnails),shortsArr[currIdx])
        setVideoId(shortsArr[currIdx].short.videoId)
        setAllowChangeIdx(false)
        setTimeout(()=>{setAllowChangeIdx(true)},500)

    }, [currIdx])
    
    const handleScroll = (e) => {
        if (!allowChangeIdx) {return}
        let currentIdx = (e.target.scrollTop + 200) / heightPerShort(innerHeight)
        currentIdx = Math.floor(currentIdx)
        if (currentIdx != currIdx && allowChangeIdx) { setCurrIdx(currentIdx) }
        // console.log("ShortsPlayer handleScroll is",e.target.scrollTop, heightPerShort(innerHeight), innerHeight,currentIdx)
        // setShowVideo(false)
    }
    useEffect(()=>{console.log('divArr', divArr)},[divArr])
    const handleMouseUp = (e) => { }
    useEffect(() => {
        //shortsArr[0].short.thumbnails[0].url
        if (!shortsArr || !shortsArr.length) { return }
        let divArray = createDivArrFromShortArr(shortsArr, currIdx)
        if (!isChannelShorts) {//directly accessed short via url, have to create first shortObject and push into array
            const shortObj = {}
        }
        // divArray.push(<div style={{scrollSnapAlign:'start',height:'100px',width:'100%'}} height='400px' width='100%'><p>LOLLLL</p></div>)
        if (!divArray.length > 1) {return}
        setDivArr(divArray)
    }, [shortsArr])
    return (
        <div  style={{ width: "100%", height: "100%", overflowY: 'auto', position:'fixed' }} key={key} >
            {/* <VideoPlayer controls={1} videoId={videoId} loop={1} showInfo={0}/> */}
            <div ref={ref}
             className='short-item-wrapper'
                style={{
                    position: 'relative', zIndex: 2, backgroundColor: "rgba(0,0,0,0)",
                    width: "100%", height: "100%", overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'
                    , scrollSnapType: snapType,
                }} onScroll={handleScroll} onMouseUp={handleMouseUp}>

                {/* {divArr} */}
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