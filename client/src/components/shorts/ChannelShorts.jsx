import { useOutletContext } from "react-router-dom";
import useShorts from "../../hooks/useShorts";
import { useEffect, useState } from "react";
import ShortCard from "./ShortCard";
import { shortsApiRedux } from "../../middlewares/shortsApi";
import { minMiniSidebarInnerWidth } from "../../configs";
import { useSelector } from "react-redux";


const ChannelShorts = () => {
    const [shorts, setChannelId] = useShorts()
    const [channelId] = useOutletContext()
    const innerWidth = useSelector((state) => state.windowRedux.innerWidth)
    const [padding, setPadding] = useState("0px 0px")
    const { data, error, isLoading } = shortsApiRedux.endpoints.getShorts.useQuery(channelId);
    
    useEffect(() => {
        if (!channelId) { return }
        setChannelId(channelId)
    }, [channelId])
    useEffect(() => {
        console.log("ChannelShorts useEffect shorts", shorts)
    }, [shorts])
    useEffect(()=>{
        if (innerWidth >= minMiniSidebarInnerWidth) {setPadding(`20px 80px`); return }
        setPadding(`20px 20px`)
    },[innerWidth])
    return (
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", flexWrap: "wrap"
        , padding:padding }}>
            {shorts.map((s, idx) => <ShortCard key={idx} snippet={s.short} channelId={channelId} />)}
        </div>
    )
}

export default ChannelShorts;