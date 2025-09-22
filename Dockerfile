# Step 1: Use an official Node.js image as the base image
FROM node:22 AS builder

# Install Bun
RUN npm install -g bun

WORKDIR /usr/src/app

# Stage 2: Install dependencies
FROM builder AS install
COPY package.json bun.lockb ./
RUN bun install && \
    mkdir -p /temp/dev && cp -r node_modules /temp/dev/

RUN bun install --production && \
    mkdir -p /temp/prod && cp -r node_modules /temp/prod/

# Stage 3: Prepare the release
FROM builder AS prerelease
COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 && apt-get clean
# RUN bun test
RUN bun run build

# Stage 4: Final release image
FROM builder AS release
COPY --from=prerelease /usr/src/app/build .
RUN apt-get update && apt-get install -y --no-install-recommends wget libstdc++6 && apt-get clean

USER node
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start"]
