# Stage 1: Build Node.js application with webpack
FROM --platform=linux/arm64 node:18.16.1 AS build-stage

# Create working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM --platform=linux/amd64 nginx:stable-alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
