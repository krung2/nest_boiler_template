FROM node:12

WORKDIR /usr/src/moram

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "start"]