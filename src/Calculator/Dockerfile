# Base image for development
FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Create the logs directory
RUN mkdir logs


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

# Create the logs directory
RUN mkdir logs

# Copy from development stage
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main.js"]
