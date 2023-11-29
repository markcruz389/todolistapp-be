FROM node:lts-alpine as base
WORKDIR /server
COPY package*.json  .
COPY . .
RUN npm install
RUN npm run build

ENV SERVER_PORT=8000
ENV DB_USER=root
ENV DB_PASSWORD=password

FROM node:lts-alpine as prod
WORKDIR /server
COPY --from=base ./server/dist ./dist
COPY package*.json .
RUN npm install --omit=dev
CMD [ "npm", "start" ]