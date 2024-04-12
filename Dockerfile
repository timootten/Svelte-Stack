# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

ENV DATABASE_URL=$DATABASE_URL
ENV ORIGIN=$ORIGIN
RUN echo $DATABASE_URL
RUN printenv

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

#ENV DATABASE_URL=postgres://postgres:YEJ2TCjmmrpzOwBMTOpSXwkBjJz8sqN574xmgW2ODFeLqBSCSjAogj9vvLvg3Gch@bgksc48:5432/postgres
#ENV ORIGIN="http://dev2.shadehost.eu, https://dev2.shadehost.eu"

RUN printenv

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=prerelease /usr/src/app/build .
COPY --from=prerelease /usr/src/app/node_modules node_modules

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]