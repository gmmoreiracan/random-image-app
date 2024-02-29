# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY frontend-app/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY frontend-app/. .

# Build the application
RUN npm run build

# Use an official lightweight Node.js runtime as a second stage build
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install serve to serve the application on a static server
RUN npm install -g serve

# Copy the build output from the first stage build
COPY --from=0 /app/build .

# Expose port 5000 for the application
EXPOSE 5000

# Run the application
CMD ["serve", "-s", ".", "-l", "5000"]