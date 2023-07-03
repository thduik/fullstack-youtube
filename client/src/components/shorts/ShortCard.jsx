import { normalFontColor } from "../../configs";


const ShortCard = ({snippet: {stats:{viewsText=null}, thumbnails=[], title=null,videoId=null}, channelId=null}) => {
    
    return (
        <div style={{height:"500px", width:"230px", margin:"10px 20px 20px 20px"}}>
            <img height="400px" width="230px"style={{borderRadius:"20px"}} src={thumbnails[0] ? thumbnails[0].url : ""} />
            <div>
                <p style={{color:normalFontColor, fontSize:"13px", fontWeight:"bold"}}>{title}</p>

            </div>
        </div>
    )
}

export default ShortCard;