# Use an official Node.js runtime as the base image
ARG IMAGEAPI_BASE_IMAGE=node:18
FROM $IMAGEAPI_BASE_IMAGE

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY image-svc /app

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "imageApiApp.mjs"]