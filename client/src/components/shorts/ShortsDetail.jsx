import ReactPlayer from "react-player/youtube";
import React, { useEffect, useState } from "react";
import { useGetVideoDetailQuery, useLazyGetVideoDetailQuery } from "../../middlewares/videoDetailApi";
import { useSearchParams } from "react-router-dom";



const ShortsDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [videoId, setVideoId] = useState(null)
    const [trigger, { data, error, isLoading } ]= useLazyGetVideoDetailQuery()

    useEffect(() => {
        const videoId = searchParams.get("v")
        if (!videoId) { return }
        console.log("VideoDetail searchParams.get(v)", searchParams.get("v"))
        setVideoId(videoId)
    }, [searchParams])

    useEffect(()=>{
        if (videoId) {
            console.log("trigger videoId")
            trigger(videoId)
        }
    },[videoId])
    useEffect(()=>{
        console.log("ShortsDetail data is", data)
    },[data])


    const videoPlayEnded = () => {

    }
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
            <div style={{ width: "350px", height: "700px" }}>
                <ReactPlayer width="100%" height={"100%"} volume={0.5} playing={videoId ? true : false} muted={true} onEnded={videoPlayEnded} url={`https://www.youtube.com/watch?v=${videoId}`} className="react-player"  controls={true} />

            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

            </div>
        </div>
    )
}

export default ShortsDetail;