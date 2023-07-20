import { memo, useEffect, useState } from "react";
import { dimmedFontColor, normalFontColor } from "../../configs";
import { useNavigate } from "react-router-dom";

const imgUrlllll = 'https://i.ytimg.com/vi/APVMm_X7H90/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLAI_1jmlcoZ1DS_FMo4ts5FaJ5eOQ'
const ShortCardB = ({short}) => {
    const navigate = useNavigate()
    const {thumbnail,title, videoId, viewCountText} = short
    const [titleDisplay, setTitleDisplay] = useState("")
    useEffect(()=>{console.log('ShortCardB short',short)},[short])

    useEffect(()=>{
        if (!title) {return}
        var displayTitle = title.substring(0,50)
        if (title.length > 50) {displayTitle += "..."}
        setTitleDisplay(displayTitle)
    },[titleDisplay])
    const clickedShort = () => {
        console.log("clickedShort")
        navigate(`/shorts?v=${videoId}`)
    }
    return (
        <div className="hover-pointer" onClick={clickedShort}
            style={{height:"370px", width:"195px", margin:"10px 5px 20px 5px"}}>
            <img height="320px" width="195px"style={{borderRadius:"20px"}} src={thumbnail?.length ? thumbnail[0].url : imgUrlllll} />
            <div style={{padding:"10px 5px 8px 5px"}}>
                <p style={{color:normalFontColor, fontSize:"14px", fontWeight:"bold", lineHeight:"1.4"}}>{titleDisplay}</p>
                <p style={{color:dimmedFontColor, fontSize:"15px", lineHeight:"1.4"}}>{viewCountText}</p>
            </div>
        </div>
    )
}

export default ShortCardB;
// export default memo(ShortCard)