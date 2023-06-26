#  Dockerfile for Node Express Backend api (development)

FROM node:18-alpine3.17

ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/app/fullstack-youtube/backend
WORKDIR /usr/app/fullstack-youtube/backend

# Install Dependencies
COPY package.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 4444

# ENV REDIS_URL redis:6379

CMD ["npm","start"]