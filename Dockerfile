# ---------- Build stage ----------
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# 👇 IMPORTANT
ARG VITE_AUTH_API_URL
ARG VITE_TRACKING_API_URL
ARG VITE_ANALYTICS_API_URL
ARG VITE_AI_CHAT_API_URL
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_TRACKING_API_URL=$VITE_TRACKING_API_URL
ENV VITE_ANALYTICS_API_URL=$VITE_ANALYTICS_API_URL
ENV VITE_AI_CHAT_API_URL=$VITE_AI_CHAT_API_URL

RUN npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]