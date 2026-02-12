# frontend/Dockerfile

# -------------------
# Build stage (local npm)
# -------------------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json npm-shrinkwrap.json* ./
RUN npm ci --silent

# Copy frontend source
COPY . .

# Build React app
# React reads environment variables like REACT_APP_API_BASE_URL from Render's Environment
RUN npm run build

# -------------------
# Production stage (nginx)
# -------------------
FROM nginx:stable-alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
