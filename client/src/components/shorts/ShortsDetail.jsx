import ReactPlayer from "react-player/youtube";
import React, { useEffect, useState } from "react";
import { useGetVideoDetailQuery, useLazyGetVideoDetailQuery } from "../../middlewares/videoDetailApi";
import { useSearchParams } from "react-router-dom";
import ShortsMenu from "./ShortsMenu";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
import ShortsPlayer from "./ShortsPlayer";



const ShortsDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [videoId, setVideoId] = useState(null)
    const [trigger, { data, error, isLoading }] = useLazyGetVideoDetailQuery()
    const innerWidth = useSelector((state) => state.windowRedux.innerWidth)
    const [{ width, height }, setDimensions] = useState({ width: "350px", height: "700px" })
    // const {shortsArr} = useSelector((state)=>state.shorts)
    useEffect(() => {
        const videoId = searchParams.get("v")
        if (!videoId) { return }
        console.log("VideoDetail searchParams.get(v)", searchParams.get("v"))
        setVideoId(videoId)
    }, [searchParams])
    useEffect(() => {
        if (innerWidth < 500 && innerHeight < 820) {
            setDimensions({ width: "100%", height: "100%" })
            return
        }
        setDimensions({ width: "350px", height: "cal(100vh - 100px)" })
    }, [innerWidth])
    useEffect(() => {
        if (videoId) {
            console.log("trigger videoId")
            trigger(videoId)
        }
    }, [videoId])
    useEffect(() => {
        console.log("ShortsDetail data is", data)
    }, [data])
    useEffect(() => { window.scrollTo(0, 0) }, [])

    const videoPlayEnded = () => {

    }
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", overflowY: 'hidden', height: "100%" }}>
            <div style={{ width: width, height: height, overflowY: 'hidden', position: "fixed" }}>
                <ShortsPlayer initialVideoId={videoId}/>
                {/* <VideoPlayer controls={0} videoId={videoId} loop={1} /> */}
            </div>
            <div style={{
                display: "flex", justifyContent: "center", flexDirection: "column", witdh: "90px",
                marginLeft: "calc( 100vw - 70px )", position: "fixed"
            }}>
                <ShortsMenu data={data} />
            </div>
        </div>
    )
}

export default ShortsDetail;