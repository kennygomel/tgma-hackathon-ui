ARG NODE_VERSION="lts-alpine"

# ----------- Build Stage -----------
FROM node:${NODE_VERSION} AS build

WORKDIR /app

COPY ../package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY .. .

# remove in case of second stage
EXPOSE 5173

RUN yarn build

# ----------- Production Stage -----------
#FROM node:${NODE_VERSION} AS production
#
#ARG NODE_ENV="production"
#
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /app
#
#COPY --from=build /app/dist ./
#
#EXPOSE 5173
#
#CMD ["node", "server/server.mjs"]
