FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run compile
CMD [ "npm", "start" ]