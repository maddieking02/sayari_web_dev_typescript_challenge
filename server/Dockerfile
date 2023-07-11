# Use a base image with Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Specify the default command to run the application
CMD ["npm", "start"]

EXPOSE 3000