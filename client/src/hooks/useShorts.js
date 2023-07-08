import { useState, useEffect } from "react";
import { fetchShortsOfChannel } from "../apiFetch/shortsApi";
import { shortsApiRedux, useGetShortsQuery, useLazyGetShortsQuery } from "../middlewares/shortsApi";


const useShorts = () => {
    const [channelId, setChannelId] = useState("UC0qTInmgyYnwWLeCUIde9Cw")
    const [shorts, setShorts] = useState([])
    const [cursorNext, setCursorNext] = useState(null)
    
    const { data, error, isLoading } = shortsApiRedux.endpoints.getShorts.useQuery(channelId);


    useEffect(async () => {
        console.log("useShorts useGetShortsQuery channelId changed", channelId)
        // if (channelId) {const res = await trigger(channelId).unwrap(); console.log("res is ", res, res) }
    }, [channelId])
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
    return [shorts, setChannelId]
}

export default useShorts;