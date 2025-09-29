# Etapa 1: Compilación
FROM node:18-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar a dist/
RUN npm run build


# Etapa 2: Imagen final ligera
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario de la etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/index.js"]
