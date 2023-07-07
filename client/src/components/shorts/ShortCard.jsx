import { memo, useEffect, useState } from "react";
import { dimmedFontColor, normalFontColor } from "../../configs";
import { useNavigate } from "react-router-dom";


const ShortCard = ({snippet: {stats:{viewsText=null}, thumbnails=[], title=null,videoId=null}, channelId=null}) => {
    const navigate = useNavigate()
    const [titleDisplay, setTitleDisplay] = useState("")
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
            style={{height:"500px", width:"230px", margin:"10px 20px 20px 20px"}}>
            <img height="400px" width="230px"style={{borderRadius:"20px"}} src={thumbnails[0] ? thumbnails[0].url : ""} />
            <div style={{padding:"10px 5px 8px 5px"}}>
                <p style={{color:normalFontColor, fontSize:"14px", fontWeight:"bold", lineHeight:"1.4"}}>{titleDisplay}</p>
                <p style={{color:dimmedFontColor, fontSize:"15px", lineHeight:"1.4"}}>{viewsText}</p>
            </div>
        </div>
    )
}

export default ShortCard;
// export default memo(ShortCard)