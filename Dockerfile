# =====================
# Stage 1: Dependencies + build
# =====================
FROM node:18-alpine AS build

WORKDIR /app

# Install build tools
RUN apk add --no-cache make gcc g++ python3

# Install pnpm and turbo
RUN npm install -g pnpm@8.0.0 turbo@^2.6.1

# Copy entire monorepo
COPY . .

# Install all dependencies including devDependencies
RUN pnpm install --recursive --ignore-scripts

# Build all apps using Turbo
RUN turbo run build

# =====================
# Stage 2: Runtime
# =====================
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy backend build and package.json
COPY --from=build /app/apps/backend/build ./backend/build
COPY apps/backend/package.json ./backend/package.json

# Copy frontend build
COPY --from=build /app/apps/frontend/dist ./frontend/dist

# Install only production dependencies for backend
WORKDIR /app/backend
RUN npm install --production

# Install lightweight static server for frontend and concurrently
RUN npm install -g serve concurrently

EXPOSE 3000 80

# Run backend and frontend using concurrently
CMD ["concurrently", "\"node build/index.js\"", "\"serve -s ../frontend/dist -l 80\""]
