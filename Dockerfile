# FROM oven/bun:alpine as base
# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine AS base
# Add dependencies to get Bun working on Alpine
RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add --no-cache --force-overwrite glibc-2.28-r0.apk
RUN apk add --no-cache libstdc++ lib32stdc++6
# Install Bun
RUN npm install -g bun

WORKDIR /usr/src/app

# Stage 2: Install dependencies
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install && \
    mkdir -p /temp/dev && cp -r node_modules /temp/dev/

RUN bun install --production && \
    mkdir -p /temp/prod && cp -r node_modules /temp/prod/

# Stage 3: Prepare the release
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules ./node_modules
RUN apk add --no-cache curl
COPY . .
RUN bun test
RUN bun run build

# Stage 4: Final release image
FROM base AS release
COPY --from=prerelease /usr/src/app/build .
RUN apk add --no-cache wget libstdc++

USER node
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start"]