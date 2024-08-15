# Stage 1: Build the application
FROM node:16 AS build

WORKDIR /app

# Copy dependency definitions
COPY package.json ./

# Install dependencies
RUN npm install --only=prod

# Copy the entire project
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:16-alpine

WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

# Expose port 3000 (adjust as needed)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
