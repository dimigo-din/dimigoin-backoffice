FROM node:18-alpine
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]

LABEL org.opencontainers.image.source=https://github.com/dimigo-din/dimigoin-backoffice