
import { useState, useEffect } from "react";
import { shortsApiRedux } from "../middlewares/shortsApi";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestFirstShort } from "../features/appData/shortsSlice";


const useSuggestedShorts = () => {
    const dispatch = useDispatch()
    const [shortId, setShortId] = useState(null)
    // const [shorts, setShorts] = useState([])
    const [cursorNext, setCursorNext] = useState(null)
    // const {shortsArr, isStreaming} = useSelector((state)=>state.shorts)
    const {shortsArr, isStreaming} = useSelector((state)=>state.shorts)
    const [trigger, { data, error, isLoading }] = shortsApiRedux.endpoints.getSuggestedShorts.useLazyQuery();

    useEffect(()=>{
        if (!shortId) { return }
        if (!isStreaming || !shortsArr || shortsArr.length == 0) { 
            dispatch( setSuggestFirstShort({short:{videoId:shortId}}))
            trigger(shortId)
        }
    },[shortId])
    useEffect(()=>{
        if (shortId) {console.log("useSuggestedShorts shortId",shortId); trigger(shortId)}
    },[shortId])
    // useEffect(() => {
    //     console.log("useSuggestedShorts shortsArr changed", data, error, isLoading)       
    // }, [shortsArr, error, isLoading])
    useEffect(() => {
        if (error) { console.log("useShorts useGetShortsQuery error", error, isLoading) }
    }, [error, isLoading])
    
   
    return [ setShortId]
}

export default useSuggestedShorts;