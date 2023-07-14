import { heightPerShort, shortHeight, shortMarginTop, shortWidth, calcVideoPlayerHeight } from "./dimensions";
import { useEffect, useState } from "react"
// import { calcVideoPlayerHeight } from "./dimensions"
import { useSelector } from "react-redux"
import VideoPlayer from "../VideoPlayer"

const ShortVideoPlayer = ({videoId}) => {
    const {innerWidth , innerHeight} = useSelector((state) => state.windowRedux)
    const [playerHeight, setPlayerHeight] = useState(0)
    useEffect(()=>{if (!innerHeight){return}; setPlayerHeight(calcVideoPlayerHeight(innerHeight))},[innerHeight])

    return (
        <div style={{
            height: `${playerHeight}px`, //videoPlayerHeight(innerHeight),
            width: shortWidth, scrollSnapAlign: 'start', scrollSnapStop: 'always', display: 'block'
            , borderRadius: '20px'
        }}>
            <VideoPlayer height={`${playerHeight}px`} controls={0} videoId={videoId} loop={1} showInfo={0} />
        </div>
    )
}

export default ShortVideoPlayer;