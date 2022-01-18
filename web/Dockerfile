FROM node:16-alpine AS base

ARG NODE_ENV
# ENV NODE_ENV "${NODE_ENV:-production}"

FROM base as deps
# Create app directory
WORKDIR /app
# Copy dependency definitions
COPY package*.json ./
# Install app dependencies
RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

FROM base
WORKDIR /app
# Copy source code
COPY . .
COPY --from=deps /app/node_modules ./node_modules/

# Specify what container executes
ENTRYPOINT ["yarn", "start"]

# Give a default cmd to the ENTRYPOINT
# CMD ["prod"]
