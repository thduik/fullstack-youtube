import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { ChannelCard, VideoCard, Loader } from "..";
import { useOutletContext } from "react-router-dom";
import { fetchFromAPI } from "../../apiFetch/fetchFromAPI";

const ChannelVideos = ({ direction = "row", flexWrap = "wrap" }) => {

    const [id] = useOutletContext()
    const [videoArr, setVideos] = useState(null);

    // console.log("videoArr is", videoArr)
    useEffect(() => {
        const fetchResult = async () => {
            const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&maxResults=20`);
            console.log("ChannelDetail videoData is", videosData)
            setVideos(videosData?.items);
        }
        fetchResult()
    }, [id])

    return (

        (videoArr == null) ? <Loader /> :

            <Stack direction={direction} flexWrap={flexWrap} justifyContent="center" gap={2}>
                {videoArr.map((item, idx) => (
                    <Box key={idx}>
                        {item.id.videoId && <VideoCard video={item} />}
                        {item.id.channelId && <ChannelCard channelDetail={item} />}
                    </Box>
                ))}
            </Stack>

    );
}

export default ChannelVideos;
