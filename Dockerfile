FROM node:alphine3.18 as build-stage
RUN mkdir /app

COPY . /app

COPY .env /app

COPY package*.json  /app

RUN npm install

RUN npm run build


FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build-stage  /app/dist/* .


EXPOSE 80


ENTRYPOINT ["nginx","-g","daemon off;"]

