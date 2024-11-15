FROM node:18-alpine AS build

WORKDIR /app

COPY src src
COPY .eslintrc.js .eslintrc.js
COPY .prettierrc .prettierrc
COPY nest-cli.json nest-cli.json
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY tsconfig.build.json tsconfig.build.json
COPY tsconfig.json tsconfig.json

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm config set store-dir .pnpm
RUN pnpm install --no-frozen-lockfile
RUN pnpm build
RUN pnpm prune --prod

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json package.json
COPY --from=build /app/pnpm-lock.yaml pnpm-lock.yaml

EXPOSE 3001

CMD ["node", "dist/main"]