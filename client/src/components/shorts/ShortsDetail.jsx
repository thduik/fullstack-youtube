import ReactPlayer from "react-player/youtube";
import React, { useEffect, useState } from "react";
import { useGetVideoDetailQuery, useLazyGetVideoDetailQuery } from "../../middlewares/videoDetailApi";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShortsPlayer from "./ShortsPlayer";
import { deleteResetAll } from "../../features/appData/shortsSlice";
import useSuggestedShorts from "../../hooks/useSuggestedShorts";



const ShortsDetail = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const [videoId, setVideoId] = useState(null)
    const [trigger, { data, error, isLoading }] = useLazyGetVideoDetailQuery()
    const innerWidth = useSelector((state) => state.windowRedux.innerWidth)
    const [{ width, height }, setDimensions] = useState({ width: "100%", height: "100%" }) //({ width: "calc(56.25vh - 63px", height: "calc(100vh - 112px)" }) //{ width: "360px", height: "640px" }
    const [menuMarginRight, setMenuMarginRight] = useState('0px')
    // const {shortsArr, isStreaming} = useSelector((state)=>state.shorts)
    const [setShortId] = useSuggestedShorts()
    useEffect(()=>{
        return ()=>{//reset redux store if shortsdetail unmount
            dispatch(deleteResetAll())
        }
    },[])
    useEffect(() => {
        const videoId = searchParams.get("v")
        if (!videoId) { return }
        console.log("VideoDetail searchParams.get(v)", searchParams.get("v"))
        setVideoId(videoId)
        setShortId(videoId)
    }, [searchParams])

    //removed because shortsMenu is now attached to shortVideoPLayer
    // useEffect(() => { 
    //     if (innerWidth < 400) {
    //         // setDimensions({ width: "calc(100vw-40px)", height: "100%" })
    //         setMenuMarginRight("calc( -50vw - 110px )")
    //         return
    //     }
    //     if (innerWidth < 500 && innerHeight < 820) {
    //         // setDimensions({ width: "100%", height: "100%" })
    //         // setDimensions({ width: "calc(100vw-40px)", height: "100%" })
    //         setMenuMarginRight("calc( -50vw - 80px )")
    //         return
    //     }
    //     // setDimensions({ width: "350px", height: "cal(100vh - 100px)" })
    //     setMenuMarginRight("calc( -417px )")
    //     return
    // }, [innerWidth])
    
    useEffect(() => {
        if (videoId) {
            console.log("trigger videoId")
            trigger(videoId)
            setShortId(videoId)
        }
    }, [videoId])
    
    useEffect(() => { window.scrollTo(0, 0) }, [])

    const videoPlayEnded = () => {

    }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", overflowY: 'hidden', height: "100%", position:'fixed', zIndex:0
        ,backgroundColor:"rgba(0,0,0,0)" }}>
            
            <div style={{ width: width, height: height, minWidth:"306px",minHeight:"544px",overflowY: 'hidden', position: "relative", zIndex:0 }}>
                
                {<ShortsPlayer key={111} initialVideoId={videoId}/>}
            </div>
           
        </div>
    )
}

export default ShortsDetail;