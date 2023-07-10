import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShortsPlayer = ({initialVideoId = null //curr videoId when mounted
}) => {
    const {shortsArr} = useSelector((state)=>state.shorts)
    const {videoId, setVideoId} = useState(null)
    useEffect(()=>{
        setVideoId(initialVideoId)
    },[])
    return (
        videoId ?
        <div>
                <VideoPlayer controls={0} videoId={videoId} loop={1} />

        </div>
        :null
    )
}

export default ShortsPlayer;