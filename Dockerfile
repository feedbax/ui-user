FROM node:12.13.0-stretch

RUN yarn global add serve

WORKDIR /ui-user
COPY ./build ./build

CMD [ "serve", "./build" ]
