sudo usermod -a -G groupName userName
sudo usermod -a -G docker youtube_runner
chown youtube_runner:youtube_runner test.sh

# from parent folder of project
chown -R youtube_runner:youtube_runner fullstack-youtube

# add execution rights to build.sh file (if not it will throw permission denied error when running ./build.sh)
chmod u+x ./build.sh

# docker compose -f ./docker-compose.prod.yaml up --build
run above command for local test of staging build in staging server


# create mongodb instance for mongoose in backend    ( --network= (either network id or name) )
`  docker run --network=fullstack-youtube_default -p 27017:27017 --name db mongo `
example
`  docker run --network=0f02641851f8 -p 27017:27017 --name db mongo `

# create redis instance   ( --network= (either network id or name) )
`
docker run --network={networkid | networkname} -p 6379:6379 --name redis_cache redis 
` 


# check network setting of container

docker inspect b95600812e4d -f "{{json .NetworkSettings.Networks }}"
docker inspect 30d9ebfca026 -f "{{json .NetworkSettings.Networks }}"


# DANGER : git reset --hard


