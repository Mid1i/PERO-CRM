# Устновка node через оф. образ
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем проект в рабочую директорию контейнера
COPY . .

# Старт
CMD ["npm", "run", "dev"]