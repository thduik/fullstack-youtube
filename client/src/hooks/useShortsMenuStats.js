import { useEffect, useState } from "react"
import { videoDetailApi } from "../middlewares/videoDetailApi"
import convertIntToStrReadable from "../utils/convertIntToStrReadable"

const useShortsMenuStats = () => {
    const [videoId, setVideoId] = useState(null)
    const [stats, setStats] = useState({likeCount:'99k', commentCount:'99k',viewCount:'99m'})
    const {useLazyQuery} = videoDetailApi.endpoints.getVideoDetail
    const [trigger, {data, error}] = useLazyQuery()
    useEffect(()=>{
        if (!videoId) {return}
        trigger(videoId)
    },[videoId])

    useEffect(()=>{
        console.log('useShortsMenuStats data is', data)
        if (!data || !data?.items?.length) { return }
        const detailObj = data.items[0]
        const detailStats = detailObj?.statistics; if (!detailStats) { return }
        console.log('useShortsMenuStats detailObj',detailStats)
        let statz = {likeCount:detailStats.likeCount, commentCount:detailStats.commentCount, viewCount:detailStats.viewCount}
        statz = convertStatz(statz)
        setStats(statz)
    }, [data])
    return {stats:stats,setVideoId:setVideoId}
}

export default useShortsMenuStats;


const convertStatz = (stats) => {
    let st = stats
    st.likeCount = convertIntToStrReadable(st.likeCount)
    st.commentCount = convertIntToStrReadable(st.commentCount)
    st.viewCount = convertIntToStrReadable(st.viewCount)
    return st
}