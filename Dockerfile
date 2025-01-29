FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG MONGO_ROOT_USR
ENV NEXT_PUBLIC_MONGO_ROOT_USR=${MONGO_ROOT_USR}
ARG MONGO_ROOT_PWD
ENV NEXT_PUBLIC_MONGO_ROOT_PWD=${MONGO_ROOT_PWD}
ARG MONGO_DB
ENV NEXT_PUBLIC_MONGO_DB=${MONGO_DB}
RUN npm run build

RUN npm prune --production

FROM node:20 AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]