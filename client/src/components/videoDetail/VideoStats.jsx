import { Typography, Box, Stack, createTheme } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { convertDateDiff } from "../../utils";
import StandardRoundButton from "../StandardRoundButton";
import LikeIcon from "../../icons/LikeIcon";
// import AlreadyLikedIcon from "../../icons/AlreadyLikedIcon";


const VideoStats = ({ title, channelTitle, channelId, viewCount, likeCount, publishedAt }) => {

    const likeClicked = () => {
        console.log("VideoStatslikeClicked")
    }   
    return (
        <div>
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={0} px={2} >
                <Link to={`/channel/${channelId}`}>
                    <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
                        {channelTitle}
                        <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                    </Typography>
                </Link>
                <Stack direction="row" gap="14px" alignItems="center">
                    <StandardRoundButton iconComp={<LikeIcon/>} onClick={likeClicked} idleBColor={"rgba(255,255,255,0.4)"}/>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        {parseInt(likeCount).toLocaleString()} likes
                    </Typography>
                </Stack>
            </Stack>
            <div style={{display:"flex", flexDirection:"row", marginTop:"7px", paddingLeft:"14px"}}>
                <Typography variant="body1" sx={{color: "#fff", opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <p style={{color:"rgba(255,255,255,0.7)", fontSize:"13px", marginLeft:"10px", marginTop:"6px"}}>{convertDateDiff(publishedAt)}</p>
            </div>
        </div>
    )
}

export default VideoStats;