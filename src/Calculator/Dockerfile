# Base image for development
FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY --chown=node:node . .

RUN chown -R node:node /app

USER node

RUN npm run build

# Base image for production
FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development --chown=node:node /app/dist ./dist

CMD ["node", "dist/main.js"]
