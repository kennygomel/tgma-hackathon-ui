# ----------- Build Stage -----------
FROM node:lts-alpine AS build

WORKDIR /app

COPY ../package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY .. .

RUN yarn build

# ----------- Production Stage -----------
FROM nginx:stable-alpine-slim AS production

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
