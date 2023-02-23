FROM node:16

WORKDIR /usr/src/test1

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run --script build

CMD [ "node", "dist/main.js" ]