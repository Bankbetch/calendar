FROM node:12.18-alpine
RUN apk update
RUN apk add --no-cache tzdata
ENV NODE_ENV=production
ENV TZ Asia/Bangkok
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock"]
COPY . .
RUN yarn install
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
