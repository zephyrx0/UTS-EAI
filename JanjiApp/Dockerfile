# Menggunakan image Python yang sudah ada di Docker Hub
FROM node:latest

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin file requirements.txt ke dalam container
COPY requirements.txt .

# Menginstal dependencies Python
RUN npm install -r requirements.txt

# Menyalin seluruh kode sumber aplikasi ke dalam container
COPY . .

# Perintah yang akan dijalankan ketika container dijalankan
CMD ["node", "app.js"]
