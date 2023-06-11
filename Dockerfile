# Installing dependencies
FROM node:18.14.0-alpine as deps

LABEL maintainer="ponyashcat228@gmail.com"
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Building the app
FROM node:18.14.0-alpine as builder

WORKDIR /app

ENV NODE_ENV=production
ENV CI=true

COPY --from=deps /app/node_modules ./node_modules
COPY package.json tsconfig.json ./
COPY app ./app

RUN yarn build

# Running the app
FROM node:18.14.0-alpine as runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
		adduser --system --uid 1001 runner

COPY --from=builder --chown=runner:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=runner:nodejs /app/build ./
COPY --chown=runner:nodejs package.json ./

USER runner

CMD [ "yarn", "start" ]
