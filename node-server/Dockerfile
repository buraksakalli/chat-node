FROM node:18

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
