# -------------------
# Build stage
# -------------------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies (using npm ci if shrinkwrap exists)
COPY package.json npm-shrinkwrap.json ./
RUN npm ci --silent

# Copy the rest of the app
COPY . .

# Build optimized production files
RUN npm run build


# -------------------
# Production stage
# -------------------
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
