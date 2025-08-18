#!/bin/bash

echo "🧹 Cleaning up old containers and volumes..."
docker compose down --volumes --remove-orphans

echo "🛠️ Rebuilding containers with fresh .env injection..."
docker compose up --build -d

echo "✅ Build complete. Checking frontend bundle for API URL..."

# Optional: check if REACT_APP_API_BASE_URL made it into final JS
docker exec react-frontend sh -c "grep backend:8001 /usr/share/nginx/html/static/js/*.js && echo '✅ API URL found in bundle' || echo '❌ API URL missing from bundle'"
