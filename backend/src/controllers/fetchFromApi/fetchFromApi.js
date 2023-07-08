const { fetchFromAPI } = require("./apiCall");


const fetchFromApiChannelSnippet = async (req, res, next) => {
    const channelId = req.query.channelId
    try {
        const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
        res.json(data)
    } catch (err) {
        res.status(402).send("error BICTH")
    }
}

const fetchFromApiVideoDetail = async (req, res, next) => {
    const {videoId} = req.query
    console.log("fetchFromApiVideoDetail called videoId is", videoId)

    try {
        if (!videoId) {throw("err fetchFromApiVideoDetail no videoID")}
        const result = await fetchFromAPI(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`)
        res.json(result)
    } catch (err) {
        console.log("fetchFromApiVideoDetail err", err)
        res.status(402).send("error BICTH")

    }
}


module.exports = {fetchFromApiChannelSnippet, fetchFromApiVideoDetail}

