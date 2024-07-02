# Stage 1: Base image
FROM oven/bun:alpine as base

WORKDIR /usr/src/app

# Stage 2: Install dependencies
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile && \
    mkdir -p /temp/dev && cp -r node_modules /temp/dev/

RUN bun install --frozen-lockfile --production && \
    mkdir -p /temp/prod && cp -r node_modules /temp/prod/

# Stage 3: Prepare the release
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
RUN apk add --no-cache libstdc++ && \
    bun test && \
    bun run build

# Stage 4: Final release image
FROM base AS release
COPY --from=prerelease /usr/src/app/build .
RUN apk add --no-cache wget libstdc++

USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start"]
