FROM node:18-alpine
WORKDIR /app

COPY package*.json  ./


RUN npm install
COPY .env .env
COPY . .

RUN npm run build

COPY build /usr/share/nginx/html

#EXPOSE 5173

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

#CMD ["npm", "run","dev"]




# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json  ./


# RUN npm install
# COPY .env .env
# COPY . .

# RUN npm run build

# EXPOSE 5173

# CMD ["npm", "run","dev"]