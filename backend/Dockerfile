# Use official Python slim image for smaller footprint
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies without cache to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend source code into container
COPY . .

# Expose the port the app will run on (changed for EC2 deployment)
EXPOSE 8001

# Run the FastAPI app using Gunicorn with Uvicorn workers (production-ready)
# 4 workers is reasonable for a small-medium EC2 instance
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8001", "--workers", "4"]
