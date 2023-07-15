import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
import { useEffect, useState, useRef } from "react"
// import { calcVideoPlayerHeight } from "./dimensions"
import { useSelector } from "react-redux"
import VideoPlayer from "../VideoPlayer"

const ShortVideoPlayer = ({ videoId, autoplay = 0, controls = 0, playOnReady = false }) => {
    const { innerWidth, innerHeight } = useSelector((state) => state.windowRedux)
    const [playerHeight, setPlayerHeight] = useState(0)
    // const iframeRef = useRef(null)
    const [iframeRef, setIframeRef] = useState(null)
    // const ref = useRef(null)
    // useEffect(()=>{},[])
    // useEffect(()=>{},[ref])
    useEffect(() => { if (!innerHeight) { return }; setPlayerHeight(calcVideoPlayerHeight(innerHeight)) }, [innerHeight])
    // useEffect(()=>{console.log("ShortVideoPlayer iframeRef",)},[])
    const changeIframeRef = (refobj) => {
        console.log("changeIframeRef", refobj)
        setIframeRef(refobj)
    }
    useEffect(() => {
        window.addEventListener(
            "command",
            (event) => {
                //if (event.origin !== "http://example.org:8080") return;
                console.log("command event heard", event)
            })
    }, [])
    useEffect(() => {
        if (!iframeRef) {console.log("error iframeRef null"); return}
        setTimeout(() => {
            //https://stackoverflow.com/questions/15164942/stop-embedded-youtube-iframe
            console.log("ShortVideoPlayer iframeRefis", iframeRef)
            if (playOnReady) {
                iframeRef.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
                return
            }
            iframeRef.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

        }, 1000)
    }, [iframeRef, playOnReady])
    return (
        <div style={{
            height: `${playerHeight}px`, //videoPlayerHeight(innerHeight),
            width: shortWidth, scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'block'
            , borderRadius: '20px'
        }}>
            <VideoPlayer iframeRef={setIframeRef} changeIframeRef={changeIframeRef}
                height={`${playerHeight}px`} controls={controls} videoId={videoId} loop={1} showInfo={0} autoplay={1} />
        </div>
    )
}

export default ShortVideoPlayer;