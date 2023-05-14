# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Create the logs directory
RUN mkdir logs

# Install app dependencies
RUN npm install --only=production

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Bundle app source
COPY . .

# Expose port 80
EXPOSE 8080
# Creates a "dist" folder with the production build
RUN npm run build

# Start the application
CMD ["node", "dist/main.js"]
