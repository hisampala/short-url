FROM node:18-alpine3.16 as dev
WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start:dev 

FROM node:18-alpine3.16 as builder
WORKDIR /app
COPY package*.json ./
COPY --from=dev /app/node_modules ./node_modules
COPY . .

RUN npm install -g prisma
RUN  prisma migrate dev --name init  
RUN  prisma generate 
RUN npm run build

FROM node:18-alpine3.16 as npm
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:18-alpine3.16 as prod
WORKDIR /app
COPY prisma ./prisma
COPY --from=builder /app/dist ./dist 
COPY --from=npm /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma 
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD npm run start:prod 