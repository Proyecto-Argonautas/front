FROM oven/bun:1.1.13-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile


FROM oven/bun:1.1.13-alpine AS production-dependencies-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN bun install --frozen-lockfile --production

FROM oven/bun:1.1.13-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

FROM oven/bun:1.1.13-alpine
COPY ./package.json bun.lockb /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["bun", "run", "start"]