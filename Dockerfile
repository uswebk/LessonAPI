FROM node:latest

WORKDIR /src
COPY ./src /src
RUN npm install
COPY . .
