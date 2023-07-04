const { popularVideoData } = require("./popular-data")

const getPopularVideosDev = (req, res, next) => {
    res.json(popularVideoData)
}

module.exports = {getPopularVideosDev}