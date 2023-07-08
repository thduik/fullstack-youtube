const expresso = require('express');
const { fetchFromApiVideoDetail } = require('../controllers/fetchFromApi/fetchFromApi');
const fetchFromApiRouter = expresso.Router();

//full path is /auth/google/login
const testMiddleware = (req, res, next) => {
    console.log("fetchFromApiVideoDetail router called")
    next()
}
fetchFromApiRouter.get("/videoDetail",testMiddleware, fetchFromApiVideoDetail)

module.exports = {fetchFromApiRouter}