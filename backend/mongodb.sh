docker run -d -p 27017:27017 mongo

kill -9 $(lsof -i :4444) &>/dev/null

kill -9 $(lsof -i :5234) &>/dev/null
