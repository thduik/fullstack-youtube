const { fetchShortsOfChannelA } = require("./shorts-api")

const getShortsOfChannel = async (req,res,next) => {
    console.log("getShortsOfChannel called", req.query)
    const channelId = req.query.channelid
    const cursorNext = req.query.cursorNext
    try {
        const result = await fetchShortsOfChannelA({channelId:channelId, cursorNext:cursorNext})
        console.log("getShortsOfChannel success result.items.length", result.contents.length, result.contents[0])
        // res.json(result)
        res.json(result)
    } catch (err) {
        console.log("errpr getShortsOfChannel")
        res.status(405).send("errorBITCHH")
    }
} 

module.exports = {getShortsOfChannel}
