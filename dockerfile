FROM node:22-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npx run build

COPY app/* .
COPY public/* .
COPY drizzle/* .
CMD [ "npm", "start", "dist/main.js"]
