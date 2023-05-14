# Base image for development
FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

# Create the logs directory with write permissions
RUN mkdir -p logs && chmod 777 logs

COPY --chown=node:node . .

RUN npm run build

# Base image for production
FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# Create the logs directory with write permissions
RUN mkdir -p logs && chmod 777 logs

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main.js"]
