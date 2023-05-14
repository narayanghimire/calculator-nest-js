# Base image for development
FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Create logs directory and change its owner
RUN mkdir logs && chown -R node:node logs

# Switch to `node` user
USER node

# Bundle app source
COPY . .

# Creates a "dist" folder with the development build
RUN npm run build

# Base image for production
FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Create logs directory and change its owner
RUN mkdir logs && chown -R node:node logs

# Switch to `node` user
USER node

# Copy from development stage
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main.js"]
