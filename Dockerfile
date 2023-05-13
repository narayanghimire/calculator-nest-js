# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Create the logs directory
RUN mkdir logs \
# Install app dependencies
npm install --only=production

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the application
CMD ["node", "dist/main.js"]