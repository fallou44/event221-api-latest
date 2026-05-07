# Stage 1: Base - Install dependencies
FROM node:20-alpine AS base

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for prisma generate)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Stage 2: Runner - Production image
FROM node:20-alpine AS runner

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy built assets and dependencies from base
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/prisma ./prisma/
COPY src ./src/

# Change ownership to the non-root user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the application port (assuming 3000, adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
