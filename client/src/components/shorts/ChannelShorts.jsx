import { useOutletContext } from "react-router-dom";
import useChannelShorts from "../../hooks/useChannelShorts";
import { useEffect, useState } from "react";
import ShortCard from "./ShortCard";
import { minMiniSidebarInnerWidth } from "../../configs";
import { useSelector } from "react-redux";


const ChannelShorts = () => {
    // const [shorts, setChannelId] = useChannelShorts()
    const [setChannelId] = useChannelShorts()
    const {shortsArr} = useSelector((state)=>state.shorts)
    const [channelId] = useOutletContext()
    const innerWidth = useSelector((state) => state.windowRedux.innerWidth)
    const [padding, setPadding] = useState("0px 0px")
    
    useEffect(() => {
        if (!channelId) { return }
        setChannelId(channelId)
    }, [channelId])
    useEffect(()=>{
        if (innerWidth >= minMiniSidebarInnerWidth) {setPadding(`20px 80px`); return }
        setPadding(`20px 20px`)
    },[innerWidth])
    return (
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", flexWrap: "wrap"
        , padding:padding }}>
            {shortsArr.map((s, idx) => <ShortCard key={idx} snippet={s.short} channelId={channelId} />)}
        </div>
    )
}

export default ChannelShorts;