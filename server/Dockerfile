# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# ---- Development ----
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 5000
CMD ["sh", "-c", "node src/seeds/templates.js && npx nodemon server.js"]

# ---- Production ----
FROM base AS prod
RUN npm ci --omit=dev
COPY server.js ./
COPY src/ ./src/
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 5000
CMD ["sh", "-c", "node src/seeds/templates.js && node server.js"]
