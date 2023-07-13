
import { useState, useEffect } from "react";
import { shortsApiRedux } from "../middlewares/shortsApi";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestFirstShort } from "../features/appData/shortsSlice";
import { createShortThumbnailUrl } from "../components/shorts/utils";


const useSuggestedShorts = () => {
    const dispatch = useDispatch()
    const [shortId, setShortId] = useState(null)
    // const [shorts, setShorts] = useState([])
    const [cursorNext, setCursorNext] = useState(null)
    // const {shortsArr, isStreaming} = useSelector((state)=>state.shorts)
    const {shortsArr, isStreaming,isChannelShorts} = useSelector((state)=>state.shorts)
    const [trigger, { data, error, isLoading }] = shortsApiRedux.endpoints.getSuggestedShorts.useLazyQuery();

    useEffect(()=>{
        if (!shortId) { return }
        if (!isStreaming || !shortsArr || shortsArr.length == 0) { //this simply means shortDetail is not opened from channelShorts. 
            //This probably means shortDetail was opened directly from url in browser ( entering http://localhost:5234/shorts?v=hrDTTyNuTYs )
            if (isChannelShorts) {return}
            dispatch( setSuggestFirstShort({short:{videoId:shortId,thumbnails:[{url:createShortThumbnailUrl(shortId)}]}}))
            trigger(shortId)
        }
    },[shortId])
    useEffect(()=>{
        if (shortId) {console.log("useSuggestedShorts shortId",shortId); trigger(shortId)}
    },[shortId])
    
    useEffect(() => {
        if (error) { console.log("useShorts useGetShortsQuery error", error, isLoading) }
    }, [error, isLoading])
    
   
    return [ setShortId]
}

export default useSuggestedShorts;