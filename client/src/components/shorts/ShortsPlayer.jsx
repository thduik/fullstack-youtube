import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";

const ShortsPlayer = ({initialVideoId = null //curr videoId when mounted
}) => {
    const {shortsArr} = useSelector((state)=>state.shorts)
    const [videoId, setVideoId] = useState(null)
    const [currIdx, setCurrIdx] = useState(0)
    useEffect(()=>{
        console.log("initialVideoId",initialVideoId)
        setVideoId(initialVideoId)
        setCurrIdx(0)
    },[initialVideoId])
    useEffect(()=>{
        console.log("shortsArr useEfect", shortsArr)
    },[shortsArr])
    return (
        videoId ?
        <div style={{ width: "100%", height: "100%", overflowY: 'hidden'}}>
                <VideoPlayer controls={0} videoId={videoId} loop={1} />

        </div>
        :null
    )
}

export default ShortsPlayer;