#syntax=docker/dockerfile:1

# Стадия сборки
FROM --platform=linux/amd64 node:20-alpine as builder
WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Копируем исходники
COPY . .

# Добавить аргументы сборки
ARG API_URL
ARG LANDING_URL
ARG PORT
ARG NODE_ENV
ARG SENTRY_DSN
ARG TELEGRAM_BOT_NAME

# Установить переменные окружения
ENV API_URL=$API_URL
ENV LANDING_URL=$LANDING_URL
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV SENTRY_DSN=$SENTRY_DSN
ENV TELEGRAM_BOT_NAME=$TELEGRAM_BOT_NAME

# Вывести переменные окружения для отладки
RUN echo "API_URL: $API_URL"
RUN echo "LANDING_URL: $LANDING_URL"
RUN echo "PORT: $PORT"
RUN echo "NODE_ENV: $NODE_ENV"
RUN echo "SENTRY_DSN: $SENTRY_DSN"
RUN echo "TELEGRAM_BOT_NAME: $TELEGRAM_BOT_NAME"

# Сборка приложения
RUN npm run build

# Финальный образ с Nginx
FROM nginx:stable-alpine

# Удаляем дефолтный конфиг
RUN rm -rf /etc/nginx/conf.d/default.conf

# Копируем кастомный конфиг (SPA + Kubernetes)
COPY nginx/yeahub_default.conf /etc/nginx/conf.d/yeahub.conf

# Копируем собранное приложение
COPY --from=builder /app/build /usr/share/nginx/html

# Безопасные права
RUN chmod -R 755 /usr/share/nginx/html

# # Запуск Nginx под непривилегированным пользователем
# USER nginx

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]

