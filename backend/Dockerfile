# Use official Node.js image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose application port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
