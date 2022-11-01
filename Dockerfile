FROM node:18.12.0-alpine3.15

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src src

ENTRYPOINT [ "sh", "-c", "cd /app && npm run run" ]