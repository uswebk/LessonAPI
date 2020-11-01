FROM node:latest

RUN apt-get update && \
    apt-get install -y sqlite3

WORKDIR /src
COPY ./src /src
RUN npm install
COPY . .
