import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
// import ShortPlayerItem from "./ShortPlayerItem";
import { heightPerShort, shortHeight, shortMarginTop, shortWidth } from "./dimensions";
import { arrayFirst, createShortItem } from "./utils";

const ShortsPlayer = ({ initialVideoId   = null //curr videoId when mounted
}) => {
    const { shortsArr, isStreaming, isChannelShorts } = useSelector((state) => state.shorts)
    const [videoId, setVideoId] = useState(null)
    const [currIdx, setCurrIdx] = useState(0)
    const [divArr, setDivArr] = useState([])
    const [showVideo, setShowVideo] = useState(true)
    const ref = useRef(null)
    const videoPlayer =
        <div style={{width:shortWidth, height:'600px', scrollSnapAlign:'start', scrollSnapStop:'always'}}>
            <VideoPlayer height="600px" controls={0} videoId={videoId} loop={1} showInfo={0} />
        </div>
    useEffect(() => {
        const onScrollEnd = (e) => {
            console.log("scrollEnded"); setShowVideo(true)
        }
        //this line is needed because it keeps scrolling to bottom after render
        if (ref?.current) { ref.current?.scrollTo(0,0) } 
        window.addEventListener("scrollend", onScrollEnd);
        return () => {
            window.removeEventListener("scrollend", onScrollEnd)
        }
    }, [shortsArr])
    useEffect(() => {
        console.log("initialVideoId", initialVideoId)
        setVideoId(initialVideoId)
    }, [initialVideoId])
    useEffect(() => {
        if (!shortsArr || !shortsArr.length) { return }
        console.log("currIdxShortsPlayer useEfect ", currIdx, arrayFirst(shortsArr[currIdx]?.short?.thumbnails),shortsArr[currIdx])
    
        let divArre = [...divArr]
        let shortArre = shortsArr
        setVideoId(shortArre[currIdx].short.videoId)
        divArre[currIdx] = createShortItem({ shortObj: shortArre[currIdx], idx: currIdx, currIdx: currIdx, videoPlayer: videoPlayer })
        if (currIdx > 0) { divArre[currIdx - 1] = createShortItem({ shortObj: shortArre[currIdx], idx: currIdx - 1, currIdx: currIdx, videoPlayer: null }) }
        if (currIdx < divArre.length - 1) { divArre[currIdx + 1] = createShortItem({ shortObj: shortArre[currIdx], idx: currIdx + 1, currIdx: currIdx, videoPlayer: null }) }
        setTimeout(()=>{setDivArr(divArre)},500)

    }, [currIdx])
    const handleScroll = (e) => {
        let currentIdx = (e.target.scrollTop + 300) / heightPerShort(innerHeight)
        currentIdx = Math.floor(currentIdx)
        if (currentIdx != currIdx) { setCurrIdx(currentIdx) }
        // console.log("ShortsPlayer handleScroll is",e.target.scrollTop, currentIdx)
        // setShowVideo(false)
    }
    useEffect(()=>{console.log('divArr', divArr)},[divArr])
    const handleMouseUp = (e) => { }
    useEffect(() => {
        //shortsArr[0].short.thumbnails[0].url
        if (!shortsArr || !shortsArr.length) { return }
        let divArray = shortsArr.map((o, idx) => {
            console.log("divArray o", o)
            return createShortItem({ shortObj: o, idx: idx, currIdx: -10 })
        }
        )
        if (!isChannelShorts) {//directly accessed short via url, have to create first shortObject and push into array
            const shortObj = {}
        }
        // divArray.push(<div style={{scrollSnapAlign:'start',height:'100px',width:'100%'}} height='400px' width='100%'><p>LOLLLL</p></div>)
        setDivArr(divArray)
    }, [shortsArr])
    const videoDivScrolled = (e) => { console.log('videoDivScrolled scrolled') }
    return (
        <div  style={{ width: "100%", height: "100%", overflowY: 'hidden' }} >


            {/* <VideoPlayer controls={1} videoId={videoId} loop={1} showInfo={0}/> */}


            <div ref={ref}
             className='short-item-wrapper'
                style={{
                    position: 'relative', zIndex: 2, backgroundColor: "rgba(0,0,0,0)",
                    width: "100%", height: "100%", overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'
                    , scrollSnapType: 'y mandatory',
                }} onScroll={handleScroll} onMouseUp={handleMouseUp}>

                {divArr}
                <div style={{ scrollSnapStop: 'normal', scrollSnapAlign: 'start', height: '600px', width: '100%' }}><p>LOLLLL</p></div>
            </div>
        </div>




    )
}

export default ShortsPlayer;