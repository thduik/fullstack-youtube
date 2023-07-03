import { useOutletContext } from "react-router-dom";
import useShorts from "../../hooks/useShorts";
import { useEffect, useState } from "react";
import ShortCard from "./ShortCard";


const ChannelShorts = () => {
    const [shorts, setChannelId] = useShorts()
    const [channelId] = useOutletContext()
    useEffect(()=>{
        if (!channelId) { return }
        setChannelId(channelId)
    },[channelId])
    useEffect(()=>{
        console.log("ChannelShorts useEffect", shorts)
    },[shorts])
    return (
        <div style={{display:'flex',flexDirection:"row", justifyContent:"center", flexWrap:"wrap", padding:"20px 90px 20px 90px"}}>
            {shorts.map(s=><ShortCard snippet={s.short} channelId={channelId}/>)}
        </div>
    )
}

export default ChannelShorts;