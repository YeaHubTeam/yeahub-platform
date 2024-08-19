#syntax=docker/dockerfile:1

# Стадия сборки
FROM node:20-alpine as builder

WORKDIR /app

# Скопировать файлы `package.json` и `package-lock.json` (или `yarn.lock`)
COPY package.json package-lock.json ./

# Установить зависимости
RUN npm ci

# Скопировать все файлы проекта в рабочую директорию
COPY . .

# Добавить аргументы сборки
ARG API_URL
ARG LANDING_URL
ARG PORT
ARG NODE_ENV

# Установить переменные окружения
ENV API_URL=$API_URL
ENV LANDING_URL=$LANDING_URL
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV

# Вывести переменные окружения для отладки
RUN echo "API_URL: $API_URL"
RUN echo "LANDING_URL: $LANDING_URL"
RUN echo "PORT: $PORT"
RUN echo "NODE_ENV: $NODE_ENV"

# Собрать приложение
RUN npm run build

# Стадия запуска с Nginx
FROM nginx:stable-alpine

# Копировать собранные файлы в контейнер Nginx
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]