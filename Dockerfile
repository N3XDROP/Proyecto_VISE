# ---------- Etapa 1: Compilación ----------
FROM node:20-alpine AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias (optimiza caché)
COPY package*.json ./

# Instalar dependencias limpias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript a /dist
RUN npm run build

# ---------- Etapa 2: Imagen final ----------
FROM node:20-alpine

# Directorio de trabajo final
WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Azure inyecta automáticamente el puerto como variable de entorno
# No fijes PORT manualmente, solo expón el puerto estándar
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]