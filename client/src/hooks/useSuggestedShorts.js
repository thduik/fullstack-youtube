
import { useState, useEffect } from "react";
import { shortsApiRedux } from "../middlewares/shortsApi";
import { useSelector } from "react-redux";


const useSuggestedShorts = () => {
    const [shortId, setShortId] = useState(null)
    const [shorts, setShorts] = useState([])
    const [cursorNext, setCursorNext] = useState(null)
    // const {shortsArr, isStreaming} = useSelector((state)=>state.shorts)
    const {shortsArr, isStreaming} = useSelector((state)=>state.shorts)
    const [trigger, { data, error, isLoading }] = shortsApiRedux.endpoints.getSuggestedShorts.useLazyQuery();

    useEffect(()=>{
        if (!shortId) { return }
        if (!isStreaming || shortsArr.length == 0) { trigger(shortId)}
    },[shortId])
    useEffect(()=>{
        if (shortId) {console.log("useSuggestedShorts shortId",shortId); trigger(shortId)}
    },[shortId])
    useEffect(() => {
        console.log("useSuggestedShorts data changed", data, error, isLoading)
        //data = {contents:[short], cursorNext:string}
       
    }, [data, error, isLoading])
    useEffect(() => {
        if (error) { console.log("useShorts useGetShortsQuery error", error, isLoading) }
    }, [error, isLoading])
    
    useEffect(() => {
        console.log("shorts in useSHort changed shorts.length", shorts.length)
    }, [shorts])
    return [ setShortId]
}

export default useSuggestedShorts;