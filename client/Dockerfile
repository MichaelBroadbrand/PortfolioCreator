# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# ---- Development ----
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npx", "vite", "--host", "0.0.0.0"]

# ---- Build (intermediate stage for production) ----
FROM base AS build
RUN npm ci
COPY . .
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL=/api
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- Production (Nginx serving static files) ----
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
