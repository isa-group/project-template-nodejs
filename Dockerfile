LABEL maintainer="ISA Research Group <isagroup.us@gmail.com>"

FROM node:9-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

EXPOSE 80
