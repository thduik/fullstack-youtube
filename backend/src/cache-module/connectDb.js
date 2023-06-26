const redis = require('redis')

let redisClient;

const connectCache = async () => {
  
  try {
    redisClient = redis.createClient({url:'redis://redis_cache:6379'});//redis_cache = name of redis service in docker compose
    console.log("redisClient connectingredis://redis:6379")
    await redisClient.connect();
    console.log("connectCache success")
  } catch (err) {
    throw("err connectCache", err)
  }
  
};

connectCache()



module.exports = { redisClient, connectCache }