DOCKERISZED YOUTUBE CLONE

Demo link <a href='http://holysheet2831.hopto.org/'> here </a>

This is a clone of the official youtube app that i built as a way to learn web dev. Tbh trying to emulate the functionalities and design of the damn app has been extremely beneficial to learning the process. I've been stuck in tutorial and courses hell for sooo long and taking on this approach finally allowed me to drastically improive my skills by having a means of applying the knowledge that i learned hands on and having the official youtube app as a guidelines to build without having the even think about user's perspective and experience too much.

\
# support google login
# deployed on vps
# code splitting js build folder with vitejs
# docker-compose allow 1 click setup of all services
# github action runner guidance



# helpers


# dev local
docker compose -f docker-compose.yaml up --build 
 
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
docker run --network=fullstack-youtube_default -p 6379:6379 --name redis_cache redis 
` 

# check network setting of container

docker inspect b95600812e4d -f "{{json .NetworkSettings.Networks }}"
docker inspect {containerid | containerName} -f "{{json .NetworkSettings.Networks }}"


# DANGER : git reset --hard


git add .github/workflows/main.yaml && git commit -m 'lol' && git push


# docker compose files explanations
dev = `local dev environment. client backend db cache all run by docker compose, in local env. backend = whatever (typically nodemon), client = whatever (typically run dev). Dockerfile.dev`
staging = `staging environment. client backend db cache all run by docker compose, in a live testing environment with live https domain. backend = pm2, client = build, so as to imitate live prod. Dockerfile.prod`
prod = `prod environment. db and cache are now seperated and not managed by docker compose.  only client and backend are run by docker compose. backend = pm2, client = build. full prod settings. Dockerfile.prod`