FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY pnpm-lock.yaml ./
COPY yarn.lock ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm","start"]
