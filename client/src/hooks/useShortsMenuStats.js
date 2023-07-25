import { useEffect, useState } from "react"

const useShortsMenuStats = () => {
    const [videoId, setVideoId] = useState(null)
    const [stats, setStats] = useState({likeCount:'99k', commentCount:'99k'})
    useEffect(()=>{
        
    },[])
    return {stats:stats,setVideoId:setVideoId}
}

export default useShortsMenuStats;