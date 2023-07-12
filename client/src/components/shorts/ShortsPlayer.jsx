import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
import ShortPlayerItem from "./ShortPlayerItem";
import { heightPerShort, shortHeight, shortMarginTop, shortWidth } from "./dimensions";

// const imgUrl = 'https://i.ytimg.com/vi/LupxMZogMnA/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLCVNacy2Rye_0k4TPE9HQFig1Ti6g'

// const checkIndexOf = (arr, videoId) => {
//     // let resIdx = -1
//     if (!arr || !videoId) {return -1}
//     for (var i = 0;i < arr.length;i++) {
//         if (arr[i].short.videoId == videoId) {return i}
//     }
//     return -1
// }

const ShortsPlayer = ({ initialVideoId = null //curr videoId when mounted
}) => {
    const { shortsArr, isStreaming, isChannelShorts } = useSelector((state) => state.shorts)
    const [videoId, setVideoId] = useState(null)
    const [currIdx, setCurrIdx] = useState(0)
    const [divArr, setDivArr] = useState([])
    const [showVideo, setShowVideo] = useState(true)
    useEffect(()=>{
        const onScrollEnd = (e) => {
            console.log("scrollEnded"); setShowVideo(true)
        }
        window.addEventListener("scrollend", onScrollEnd);
        return () => {
            window.removeEventListener("scrollend", onScrollEnd)
        }
    },[])
    useEffect(() => {
        console.log("ShortsPlayer shortsArr changed", shortsArr)
    }, [shortsArr])
    useEffect(() => {
        console.log("initialVideoId", initialVideoId)
        setVideoId(initialVideoId)
    }, [initialVideoId])
    useEffect(() => {
        console.log("shortsArrShortsPlayer useEfect", shortsArr)
    }, [shortsArr]) //shortsArr[0].short.thumbnails[0].url
    useEffect(() => {
        console.log("currIdxShortsPlayer useEfect ", currIdx, shortsArr[currIdx])
        let divArre = divArr
        const shortObj = shortsArr[currIdx]

    }, [currIdx])
    const handleScroll = (e) => {
        let currentIdx = ( e.target.scrollTop + 50) / heightPerShort(innerHeight)
        currentIdx = Math.floor(currentIdx)
        if (currentIdx != currIdx) { setCurrIdx(currentIdx) }
        // console.log("ShortsPlayer handleScroll is",e.target.scrollTop, currentIdx)
        setShowVideo(false)
    }
    const handleMouseUp = (e) => {
        console.log("mouseUp")
        setShowVideo(true)
    }
    useEffect(() => {
        if (!shortsArr || !shortsArr.length) { return }
        let divArray = shortsArr.map( (o, idx) => {
            console.log("divArray o", o.short.thumbnails)
            const imgUrl = o?.short?.thumbnails?.length ? o.short.thumbnails[0].url : `https://i.ytimg.com/vi/${o?.short?.videoId}/frame0.jpg`
            return < ShortPlayerItem key={idx} imgUrl={imgUrl} />
            }
        )
        divArray.push(<div style={{scrollSnapAlign:'start',height:'100px',width:'100%'}} height='400px' width='100%'><p>LOLLLL</p></div>)
        console.log('divArr', divArray)
        setDivArr(divArray)
    }, [shortsArr])
    const videoDivScrolled = (e) => {console.log('videoDivScrolled scrolled')}
    return (
        videoId ?

            <div 
            style={{ width: "100%", height: "100%", overflowY: 'auto'
            ,scrollSnapType:'y mandatory'}} onScroll={handleScroll} onMouseUp={handleMouseUp}>
                {/* <div onScrollCapture={videoDivScrolled}
                 style={{ width: shortWidth, height: shortHeight, position:'fixed',
            display:showVideo ? 'block' : 'none' }}  >
                     
                    <VideoPlayer controls={1} videoId={videoId} loop={1} showInfo={0}/>
                
                </div> */}
                {divArr}
                
            </div>
            : null
    )
}

export default ShortsPlayer;