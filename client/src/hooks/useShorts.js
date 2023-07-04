import { useState, useEffect } from "react";
import { fetchShortsOfChannel } from "../apiFetch/shortsApi";


const useShorts = () => {
    const [channelId, setChannelId] = useState(null)
    const [shorts, setShorts] = useState([])
    const [cursorNext, setCursorNext] = useState(null)
    
    useEffect(()=>{
        fetchShortsOfChannel({channelId:channelId, cursorNext:cursorNext}, (res)=>{
            
            console.log("fetchShortsOfChannel success", res.contents)
            if (!res || !res?.contents) {console.log("resEmptyError"); return }
            setCursorNext(res.cursorNext)
            const currShorts = [...shorts]
            currShorts.push(...res.contents)
            setShorts(currShorts)
        })
    },[channelId])
    useEffect(()=>{
        console.log("shorts in useSHort changed shorts.length", shorts.length)
    },[shorts])
    return [shorts, setChannelId]
}

export default useShorts;