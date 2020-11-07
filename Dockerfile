FROM node:latest

RUN apt-get update && \
    apt-get install -y sqlite3
WORKDIR /src
COPY ./src /src
RUN mkdir /db
RUN /usr/bin/sqlite3 /db/test.sqlite3 < /src/app/db/initial_insert.sql
RUN npm install
COPY . .