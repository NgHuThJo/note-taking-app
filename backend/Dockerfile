FROM node:lts-alpine
WORKDIR /app
COPY ../tsconfig.base.json /app/tsconfig.base.json
COPY ../shared /app/shared
COPY package*.json ./
RUN npm i
COPY . .
RUN npm i -D typescript
EXPOSE 4000
RUN npm run build
CMD ["npm", "start"]