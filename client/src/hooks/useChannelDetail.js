import { useState, useEffect } from "react"
import { useLazyGetChannelDetailQuery } from "../middlewares/youtubeApi"


const useChannelDetail = () => {
    const [channelId, setChannelId] = useState(null)
    const [trigger,{ data, error, isLoading }] = useLazyGetChannelDetailQuery()
    const [result, setResult] = useState(null)
    // const [channelDetail, setChannelDetail] = 
    useEffect(()=>{
        console.log("useChannelDetail channelId",channelId)
        if (channelId) { trigger(channelId) }
    },[channelId])
    useEffect(()=>{
        if (!data || !data.items || data.items.length < 1) { return }
        setResult(data.items[0])
    },[data])

    return {setChannelId:setChannelId, channelDetail:result}
}

export default useChannelDetail;