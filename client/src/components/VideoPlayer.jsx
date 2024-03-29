import { useEffect, useRef, useState } from "react";
import { shortHeight } from "./shorts/dimensions";

const VideoPlayer = ({ videoId = null, loop = 0, autoplay = 1, width = '100%', className = "", controls = 1, showInfo = 1
    , iframeRef, changeIframeRef = null, qualitly = 360 , minWidth = '200px',minHeight = '400px'
    , height = shortHeight }) => {
    // const ref = useRef(null)
    // const [iframeRef, setIframeRef] = useState(null)
    const iRef = useRef(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const ref = useRef(null)
    useEffect(

        () => {
            if (!changeIframeRef) {return}
            // console.log("refVideoPlayer is ", ref.current)
            changeIframeRef(ref.current)
        }, [ref, changeIframeRef])

    useEffect(() => {
        if (!videoId) { return }
        let urlString = `https://www.youtube-nocookie.com/embed/${videoId}?controls=${controls}&autoplay=${autoplay}&enablejsapi=1&loop=${loop}`
        console.log(urlString)
        if (loop) { urlString += `&playlist=${videoId}` }
        if (qualitly == 360) { urlString += '&vq=medium' }
        if (!showInfo) { urlString += '&showinfo=0' }
        setVideoUrl(urlString)
        //
    }, [videoId])
    // useEffect(() => {
    //     window.addEventListener(
    //         "command",
    //         (event) => {
    //             //if (event.origin !== "http://example.org:8080") return;
    //             console.log("command event heard", event)
    //         })
    // }, [])

    useEffect(() => { console.log('videoPlayer height is', height) }, [height])
    return (
        <div height={'100%'} style={{height:'100%',minHeight:minHeight, minWidth:minWidth}}>
            {/* <YouTube videoId="2g811Eo7K8U" /> */}


            <iframe ref={ref} className={className} src={videoUrl}
                frameBorder={'1'}
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
                height={'100%'}
                width={'100%'}
                controls={false}
            />
        </div>
    )
}

export default VideoPlayer;