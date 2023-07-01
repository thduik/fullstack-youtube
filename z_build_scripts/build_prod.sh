# docker compose -f ./docker-compose.prod.yaml up --build --wait
# docker compose -f ./docker-compose.prod.yaml start 
docker compose up
docker compose -f /var/www/fullstack-youtube/docker-compose.prod.yaml up --build
docker compose -f /var/www/fullstack-youtube/docker-compose.prod.yaml start --build


# docker-compose -f docker-compose.yaml up --build