const { fetchChannelDetails } = require("./channelApi")

const getChannelDetails = async (req, res, next) => {
    const {channelid} = req.query
    console.log("getChannelDetails channelId",channelid)
    try {
        const result = await fetchChannelDetails({channelId:channelid})
        console.log("getChannelDetails result", result)
        res.json(result)
    } catch (error) {
        console.log("getChannelDetails", error)
        res.status(402).send("error BITTCHH")
    }
}

module.exports = {getChannelDetails}