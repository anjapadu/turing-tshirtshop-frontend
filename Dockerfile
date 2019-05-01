FROM node:8

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./dist/* .

EXPOSE 4000

CMD ["npm", "run", "server.js]