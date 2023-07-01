#testing prod build to make sure no bug in prod build process
docker compose -f ./docker-compose.prod.yaml up --build --remove-orphans 

docker compose -f ./docker-compose.yaml up --build --remove-orphans