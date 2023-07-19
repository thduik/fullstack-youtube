const { fetchShortsOfChannelA, fetchSuggestedShorts, fetchPopularShorts } = require("./shorts-api")

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

'/shorts/suggested?shortid=${shortlId}'
const getSuggestedShorts = async (req,res,next) => {
    console.log("getSuggestedShorts called", req.query)
    const {shortid} = req.query
    try {
        const result = await fetchSuggestedShorts({shortid:shortid})
        console.log("getSuggestedShorts success result.items.length")
        // res.json(result)
        res.json(result)
    } catch (err) {
        console.log("errpr getSuggestedShorts", err)
        res.status(405).send("errorBITCHH")
    }
} 

const getPopularShorts =  async (req, res, next) => {

    try {
        const result = await fetchPopularShorts()
        res.json(result)
    } catch (error) {
        console.log('getPopularShorts err', error)
        res.status(404).send('error bnitch')
    }
}
module.exports = {getShortsOfChannel, getSuggestedShorts, getPopularShorts}
