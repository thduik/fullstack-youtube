docker run -d -p 27017:27017 mongo



docker-compose up -d --build

docker-compose up --build

docker compose up --build


kill -9 $(lsof -i :4444) &>/dev/null

kill -9 $(lsof -i :5234) &>/dev/null