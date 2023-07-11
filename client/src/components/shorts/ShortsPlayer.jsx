import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";

const imgUrl = 'https://i.ytimg.com/vi/LupxMZogMnA/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLCVNacy2Rye_0k4TPE9HQFig1Ti6g'

// const checkIndexOf = (arr, videoId) => {
//     // let resIdx = -1
//     if (!arr || !videoId) {return -1}
//     for (var i = 0;i < arr.length;i++) {
//         if (arr[i].short.videoId == videoId) {return i}
//     }
//     return -1
// }

const ShortsPlayer = ({initialVideoId = null //curr videoId when mounted
}) => {
    const {shortsArr, isStreaming, isChannelShorts} = useSelector((state)=>state.shorts)
    const [videoId, setVideoId] = useState(null)
    const [currIdx, setCurrIdx] = useState(0)
    useEffect(() => {
        console.log("ShortsPlayer shortsArr changed", shortsArr)       
    }, [shortsArr])
    useEffect(()=>{
        console.log("initialVideoId",initialVideoId)
        setVideoId(initialVideoId)
    },[initialVideoId])
    useEffect(()=>{
        console.log("shortsArrShortsPlayer useEfect", shortsArr)
    },[shortsArr]) //shortsArr[0].short.thumbnails[0].url
    useEffect(()=>{
        console.log("currIdxShortsPlayer useEfect ", currIdx)
    },[currIdx])
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop
        console.log("ShortsPlayer handleScroll is", bottom)
    }
    return (
        videoId ?
        <div style={{ width: "100%", height: "100%", overflowY: 'scroll'}} onScroll={handleScroll}>
                <img src={imgUrl} height={'100%'} width={'100%'}/>
                <VideoPlayer controls={1} videoId={videoId} loop={1} showInfo={0}/>
                <img src={imgUrl} height={'100%'} width={'100%'}/>
        </div>
        :null
    )
}

export default ShortsPlayer;