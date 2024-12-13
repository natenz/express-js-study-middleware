# Menggunakan Node.js versi terbaru
FROM node:18-alpine

# Instalasi Python dan build tools
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Buat folder kerja
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
