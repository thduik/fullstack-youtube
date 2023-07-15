import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
import { useEffect, useState, useRef } from "react"
// import { calcVideoPlayerHeight } from "./dimensions"
import { useSelector } from "react-redux"
import VideoPlayer from "../VideoPlayer"

const ShortVideoPlayer = ({ videoId, autoplay = 0, controls = 0, playOnReady = false }) => {
    const { innerWidth, innerHeight } = useSelector((state) => state.windowRedux)
    const [playerHeight, setPlayerHeight] = useState(0)
    const iframeRef = useRef(null)
    useEffect(() => { if (!innerHeight) { return }; setPlayerHeight(calcVideoPlayerHeight(innerHeight)) }, [innerHeight])
    // useEffect(()=>{console.log("ShortVideoPlayer iframeRef",)},[])
    useEffect(() => {
        setTimeout(() => {
            if (!iframeRef) {console.log("error iframeRef null"); return}
            console.log("ShortVideoPlayer iframeRefis", iframeRef.current.contentWindow.postMessage)
            if (playOnReady) {
                iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
                return
            }
            iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

        }, 200)
    }, [videoId])
    return (
        <div style={{
            height: `${playerHeight}px`, //videoPlayerHeight(innerHeight),
            width: shortWidth, scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'block'
            , borderRadius: '20px'
        }}>
            <VideoPlayer iframeRef={iframeRef}
                height={`${playerHeight}px`} controls={controls} videoId={videoId} loop={1} showInfo={0} autoplay={autoplay} />
        </div>
    )
}

export default ShortVideoPlayer;