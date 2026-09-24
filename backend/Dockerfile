FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY backend/package*.json ./backend/
COPY database ./database

WORKDIR /app/backend
RUN npm install && npm run prisma:generate

COPY backend .

EXPOSE 4000

CMD ["npm", "start"]