FROM node:6.9.4
MAINTAINER ezTEAM <ezpaarse@couperin.org>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

ENTRYPOINT ["./node_modules/.bin/http-server", "public", "-p", "8080"]