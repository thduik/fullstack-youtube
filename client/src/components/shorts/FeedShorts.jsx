// import { useOutletContext } from "react-router-dom";
import useChannelShorts from "../../hooks/useChannelShorts";
import { useEffect, useState } from "react";
import { minMiniSidebarInnerWidth } from "../../configs";
import { useSelector } from "react-redux";
import ShortCard from "./ShortCard";
import usePopularShorts from "../../hooks/usePopularShorts";
import ShortCardB from "./ShortCardB";


const   FeedShorts = () => {
    // const [shorts, setChannelId] = useChannelShorts()
    const {shortsArr, loadMoreShorts} = usePopularShorts()
    // const [setChannelId] = useChannelShorts()
    // const {shortsArr} = useSelector((state)=>state.shorts)
    // const [channelId] = useOutletContext()
    const innerWidth = useSelector((state) => state.windowRedux.innerWidth)
    const [padding, setPadding] = useState("0px 0px")
    
    useEffect(()=>{
        console.log('FeedShorts shortsArr', shortsArr)
    },[shortsArr])
    useEffect(()=>{
        if (innerWidth >= minMiniSidebarInnerWidth) {setPadding(`20px 80px`); return }
        setPadding(`20px 160px`)
    },[innerWidth])
    return (
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "normal", overflowY:'scroll'
        , padding:padding, margin:'0px 50px 20px 100px', paddingLeft:'0' }}>
            {/* <div> */}
            {shortsArr.map((s, idx) => <ShortCardB key={idx} short = {s} />)}
            {/* </div> */}
        </div>
    )
}

export default FeedShorts;