import { useState, useEffect } from "react";
import { fetchShortsOfChannel } from "../apiFetch/shortsApi";
import { shortsApiRedux} from "../middlewares/shortsApi";


const useChannelShorts = () => {
    const [channelId, setChannelId] = useState(null)
    const [shorts, setShorts] = useState([])
    const [cursorNext, setCursorNext] = useState(null)
    
    const [trigger, { data, error, isLoading }] = shortsApiRedux.endpoints.getChannelShorts.useLazyQuery();
    useEffect(()=>{
        if (channelId) {trigger(channelId)}
    },[channelId])
    useEffect(() => {
        console.log("useShorts useGetShortsQuery data changed", data, error, isLoading)
        //data = {contents:[short], cursorNext:string}
        if (data && data.contents.length > 0) {
            setShorts(data.contents)
        }
    }, [data, error, isLoading])
    useEffect(() => {
        if (error) { console.log("useShorts useGetShortsQuery error", error, isLoading) }
    }, [error, isLoading])
    
    useEffect(() => {
        console.log("shorts in useSHort changed shorts.length", shorts.length)
    }, [shorts])
    return [ setChannelId]
}

export default useChannelShorts;