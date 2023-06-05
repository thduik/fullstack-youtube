const redis = require('redis')

let redisClient;

const connectCache = async () => {
  
  try {
    redisClient = redis.createClient();
    await redisClient.connect();
  } catch (err) {
    throw("err connectCache", err)
  }
  
};


module.exports = { redisClient, connectCache }