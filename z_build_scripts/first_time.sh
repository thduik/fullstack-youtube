docker run --network=fullstack-youtube_default -p 27017:27017 --name db mongo

docker run --network=fullstack-youtube_default -p 6379:6379 --name redis_cache redis 
