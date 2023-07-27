import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
import { useEffect, useState, useRef } from "react"
// import { calcVideoPlayerHeight } from "./dimensions"
import { useSelector } from "react-redux"
import VideoPlayer from "../VideoPlayer"
import ShortsMenu from "./ShortsMenu";
import useShortsVideoPlayer from "./useShortsVideoPlayer";

const ShortVideoPlayer = ({ videoId, autoplay = 0, controls = 0, playOnReady = false }) => {
    const { innerWidth, innerHeight } = useSelector((state) => state.windowRedux)
    const [playerHeight, setPlayerHeight] = useState(calcVideoPlayerHeight(innerHeight))
    const {menuMarginRight} = {menuMarginRight:'10px'} //useMenuMarginRight
    const {playerClassName, commentClassName, toggleCommentShow} = useShortsVideoPlayer()
    // const iframeRef = useRef(null)
    const [iframeRef, setIframeRef] = useState(null)
    // const ref = useRef(null) 
    // useEffect(()=>{},[])
    // useEffect(()=>{},[ref])
    useEffect(() => { if (!innerHeight) { return }; console.log("innerHeight is", innerHeight)
    setPlayerHeight(calcVideoPlayerHeight(innerHeight)) }, [innerHeight])
    // useEffect(()=>{console.log("ShortVideoPlayer iframeRef",)},[])
    const changeIframeRef = (refobj) => {
        console.log("changeIframeRef", refobj)
        setIframeRef(refobj)
    }
    useEffect(() => {
        if (iframeRef?.contentWindow?.postMessage ) {console.log("error iframeRef null"); return}
        setTimeout(() => {
            //https://stackoverflow.com/questions/15164942/stop-embedded-youtube-iframe
            console.log("ShortVideoPlayer iframeRefis", iframeRef)
            if (iframeRef?.contentWindow?.postMessage ) {console.log("error iframeRef null"); return}
            if (playOnReady) {
                iframeRef?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
                return
            }
            if (iframeRef?.contentWindow?.postMessage ) {console.log("error iframeRef null"); return}
            iframeRef?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

        }, 400)
    }, [iframeRef, playOnReady])
    const clickedButton = (text) => {
        console.log("ShortVideoPlayer clickedmenu", text);
        if (text=='comment') {toggleCommentShow()}
    }
    return (
        <div style={{
            height: `${playerHeight}px`, //videoPlayerHeight(innerHeight),
            width: shortWidth, scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'flex', flexDirection:'row'
            , borderRadius: '20px', minHeight:'550px', minWidth:"300px"
        }}>
            {/* <div style={{minHeight:`${playerHeight}px`}}> */}
            <VideoPlayer iframeRef={setIframeRef} changeIframeRef={changeIframeRef} height={`${playerHeight}px`} minWidth="100%"
                 controls={controls} videoId={videoId} loop={1} showInfo={0} autoplay={autoplay} />
            {/* </div> */}
            <div className={`fucking-div`} style={{backgroundColor:'blue', position:'absolute', zIndex:100, width:'1px', marginRight:'300px', marginLeft:'auto', margin:`120px ${menuMarginRight} auto auto`}}>
                <div style={{width:'45px', position:'relative', backgroundColor:'blue', marginRight:'auto', marginLeft:`calc(${shortWidth} + 10px)`}}>
                    <ShortsMenu key={1} videoId={videoId} onClick={clickedButton}/>
                </div>
            </div>
            <div className={'temp'}>

            </div>

        </div>
    )
}

export default ShortVideoPlayer;