FROM node:18-alpine as build-stage
WORKDIR /app
COPY .env .env

COPY package*.json  ./

COPY . .



RUN npm install

RUN npm run build


FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build-stage /app/dist/* /usr/share/nginx/html


EXPOSE 80


ENTRYPOINT ["nginx","-g","daemon off;"]

