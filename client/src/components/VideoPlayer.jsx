import { useEffect, useState } from "react";

const VideoPlayer = ({ videoId=null, loop = 0, autoplay = 1, height = '100%', width = '100%', className = "", controls = 1, showInfo = 1 }) => {
    const [videoUrl, setVideoUrl] = useState(null)
    useEffect(()=>{
        if (!videoId) {return}
        let urlString = `https://www.youtube.com/embed/${videoId}?controls=${controls}&autoplay=${autoplay}&loop=${loop}`
        if (loop) {urlString += `&playlist=${videoId}`}
        if (!showInfo) {urlString += '&showinfo=0'}
        setVideoUrl(urlString)
        
    },[videoId])
    return (
        videoUrl ?
            <iframe className={className} src={videoUrl}
                frameBorder={'1'}
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
                height={height}
                width={width}
                controls={false}
                
            />

            : null
    )
}

export default VideoPlayer;