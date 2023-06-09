const redis = require('redis')

let redisClient;

const connectCache = async () => {
  
  try {
    redisClient = redis.createClient();
    await redisClient.connect();
    console.log("connectCache success")
  } catch (err) {
    throw("err connectCache", err)
  }
  
};

connectCache()



module.exports = { redisClient, connectCache }