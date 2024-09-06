FROM node:18 as builder
LABEL stage=builder

WORKDIR /temp
COPY . .
COPY ./infra/.env ./.env

RUN yarn install && yarn build

FROM node:18 as runner

ARG DB_HOST_ARG
ARG DB_PORT_ARG
ARG DB_USER_ARG
ARG DB_PASSWORD_ARG
ARG JWT_SECRET_ARG
ARG NODE_ENV_ARG
ARG API_PORT_ARG

ENV DB_HOST=${DB_HOST_ARG}
ENV DB_PORT=${DB_PORT_ARG}
ENV DB_NAME=${DB_NAME_ARG}
ENV DB_USER=${DB_USER_ARG}
ENV DB_PASSWORD=${DB_PASSWORD_ARG}
ENV JWT_SECRET=${JWT_SECRET_ARG}
ENV NODE_ENV=${NODE_ENV_ARG}
ENV API_PORT_ARG=${API_PORT_ARG}

WORKDIR /var/www/api

COPY --from=builder /temp/*.json ./
COPY --from=builder /temp/yarn.* ./
COPY --from=builder /temp/node_modules ./node_modules
COPY --from=builder /temp/dist ./dist
COPY --from=builder /temp/src ./src
COPY --from=builder /temp/.env ./.env

CMD ["node", "./dist/main.js"]
