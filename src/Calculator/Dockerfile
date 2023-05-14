# Base image for development
FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

RUN mkdir logs && chown -R node:node /app

USER node

COPY . .

RUN npm run build

# Base image for production
FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

RUN mkdir logs && chown -R node:node /app

USER node

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main.js"]
