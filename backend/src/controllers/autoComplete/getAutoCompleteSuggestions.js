const { fetchAutoCompleteSuggestions } = require("./api")

const getAutoCompleteSuggestions = async (req, res, next) => {
    const {q, region} = req.query
    
    try {
        if (!q) {throw('q not found lol')}
        const result = await fetchAutoCompleteSuggestions({keyword:q})
        console.log('getAutoCompleteSuggestions result', result)
        res.json(result)
    } catch (error) {
        console.log("err getAutoCompleteSuggestions",error)
        res.status(402).send('error bitch')
    }
    
}

module.exports = {getAutoCompleteSuggestions}