import { Typography, Box, Stack, createTheme } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const VideoStats = ({title,channelTitle,channelId, viewCount,likeCount }) => {
    return (
        <div>
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                <Link to={`/channel/${channelId}`}>
                    <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
                        {channelTitle}
                        <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                    </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        {parseInt(viewCount).toLocaleString()} views
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        {parseInt(likeCount).toLocaleString()} likes
                    </Typography>
                </Stack>
            </Stack>
        </div>
    )
}

export default VideoStats;