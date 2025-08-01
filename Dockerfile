FROM node:18-alpine3.10

WORKDIR /app
COPY package*.json ./
# ⚠️ Хуучирсан, CVE-тэй package суулгах (openssl 1.1.1c-r0 — CRITICAL CVE-үүдтэй)
RUN apk add --no-cache openssl=1.1.1c-r0 bash=5.0.0-r0 curl=7.66.0-r0

# ⚠️ Secret leak — нууц үг хатуу кодлогдсон
RUN echo "DB_PASSWORD=admin1234" > /root/.env

# ⚠️ Wide privilege — root хэрэглэгчээр ажиллаж байна
USER root
# ⚠️ Хуучирсан, CVE-тэй package суулгах (openssl 1.1.1c-r0 — CRITICAL CVE-үүдтэй)
RUN apk add --no-cache openssl=1.1.1c-r0 bash=5.0.0-r0 curl=7.66.0-r0

# ⚠️ Secret leak — нууц үг хатуу кодлогдсон
RUN echo "DB_PASSWORD=admin1234" > /root/.env
USER root
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/app.js"]
