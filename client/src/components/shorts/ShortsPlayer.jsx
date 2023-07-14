import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
// import ShortPlayerItem from "./ShortPlayerItem";
import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
import { arrayFirst, createDivArrFromShortArr, createShortItem } from "./utils";
import { useSearchParams } from "react-router-dom";
import ShortPlayerItem from "./ShortPlayerItem";
import ShortVideoPlayer from "./ShortVideoPlayer";


const ShortsPlayer = ({ initialVideoId   = null, key = 1}) => { //curr videoId when mounted
    const { shortsArr, isStreaming, isChannelShorts } = useSelector((state) => state.shorts)
    const [myShortArr, setMyShortArr] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const [snapType, setSnapType] = useState('none')
    const [videoId, setVideoId] = useState(null)
    const [currIdx, setCurrIdx] = useState(0)
    const [divArr, setDivArr] = useState([])
    const [showVideo, setShowVideo] = useState(true)
    const {innerWidth , innerHeight} = useSelector((state) => state.windowRedux)
    const [videoPlayer, setVideoPlayer] = useState(null)
    const ref = useRef(null)
    const [blockNewShort, setBlockNewShort] = useState(false)
    useEffect(() => {
        const currVidId = searchParams.get("v")
        if (!initialVideoId) {console.log('settingVideoIdsearchParams',currVidId);setVideoId(currVidId);setCurrIdx(-1);setCurrIdx(0)} //3 lines to activate videoPLayer workflow
    },[searchParams])

    useEffect(()=>{
        const playerHeight = calcVideoPlayerHeight(innerHeight)
        setVideoPlayer(<div style={{height:`${playerHeight}px`, //videoPlayerHeight(innerHeight),
        width:shortWidth,  scrollSnapAlign:'start', scrollSnapStop:'always', display:'block'
        , borderRadius:'20px'}}>
        <VideoPlayer height={`${playerHeight}px`} controls={0} videoId={videoId} loop={1} showInfo={0} />
    </div>)
    },[videoId])
    
    useEffect(() => {
        //trigger videoPlayer change workflow
        // setCurrIdx(0)
        console.log("useEffect shortsArr changed")
        
        if (shortsArr.length > 1) {//default snapType = 'none' to prevent bug. This bug makes
            //page scroll to bottoms as soon as divArr is rendered. It is not default/normal behavior when array of components
            //is rendered with scrollSnapTyp parent and scrollSnapAlign children. 
            //this workaround of defaulting snapType to 'none' is by far the best
            setTimeout(()=>{setSnapType('y mandatory')},200) 
        }
        return () => {
        }
    }, [shortsArr])
    useEffect(() => {
        console.log("initialVideoId", initialVideoId)
        setVideoId(initialVideoId)
    }, [initialVideoId])
    useEffect(() => {
        if (blockNewShort) {return}
        if (!shortsArr || !shortsArr.length || currIdx < 0 || currIdx >= shortsArr.length) { 
            console.log("currIdxShortsPlayer useEfect ", currIdx, shortsArr.length, shortsArr)
            return }
        console.log("currIdxShortsPlayer useEfect ", currIdx, arrayFirst(shortsArr[currIdx]?.short?.thumbnails),shortsArr[currIdx])
    
        let divArre = createDivArrFromShortArr(shortsArr, currIdx)
        let shortArre = shortsArr
        setVideoId(shortsArr[currIdx].short.videoId)
        
        // divArre[currIdx] = createShortItem({ shortObj: shortArre[currIdx], idx: currIdx, currIdx: currIdx, videoPlayer: videoPlayer })
        // if (currIdx > 0) { divArre[currIdx - 1] = createShortItem({ shortObj: shortArre[currIdx-1], idx: currIdx - 1, currIdx: currIdx, videoPlayer: null }) }
        // if (currIdx < divArre.length - 1) { divArre[currIdx + 1] = createShortItem({ shortObj: shortArre[currIdx+1], idx: currIdx + 1, currIdx: currIdx, videoPlayer: null }) }
        setTimeout(()=>{divArre[currIdx] = videoPlayer},100)
        setTimeout(()=>{
            setDivArr(divArre)
            setBlockNewShort(true)
            setTimeout(()=>{setBlockNewShort(false)},500)
        },100)

    }, [currIdx])
    
    const handleScroll = (e) => {
        let currentIdx = (e.target.scrollTop + 300) / heightPerShort(innerHeight)
        currentIdx = Math.floor(currentIdx)
        if (currentIdx != currIdx) { setCurrIdx(currentIdx) }
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
                    
                    if (idx == currIdx && !blockNewShort) { 
                        // setBlockNewShort(true)
                        // setTimeout(()=>{setBlockNewShort(false)},500)
                        return <ShortVideoPlayer videoId={videoId} />
                    }
                    const imgUrl = o?.short?.thumbnails?.length ? o.short.thumbnails[0].url : createShortThumbnailUrl(o?.short?.videoId)
                    return < ShortPlayerItem key={idx} imgUrl={imgUrl} /> 
                })}
                <div style={{ scrollSnapStop: 'normal', scrollSnapAlign: 'start', height: '400px', width: '100%' }}><p>LOLLLL</p></div>
            </div>
        </div>




    )
}

export default ShortsPlayer;