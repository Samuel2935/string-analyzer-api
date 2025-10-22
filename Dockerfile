# Stage 1: Build the TypeScript app
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the entire project
COPY . .

# Build the project
RUN npm run build


# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

EXPOSE 5000

# Start the app
CMD ["node", "dist/server.js"]
