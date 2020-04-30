FROM node:12.13.0-stretch as build

WORKDIR /ui-user-build

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./tsconfig.json ./tsconfig.json
COPY ./.npmrc ./.npmrc
COPY ./.yarnrc ./.yarnrc
RUN yarn install

COPY ./src ./src
COPY ./public ./public
RUN yarn build


FROM node:12.13.0-stretch
RUN yarn global add serve

WORKDIR /ui-user
COPY  --from=build /ui-user-build/build ./build

CMD [ "serve", "./build" ]
