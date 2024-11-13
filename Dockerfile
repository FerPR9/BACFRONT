# Usar la imagen oficial de Node.js basada en Alpine 
FROM node:18.17.1-alpine

RUN mkdir -p /usr/src/app

# Crear el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json para instalar las dependencias
COPY package.json .
# COPY package-lock.json .

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . .

# Exponer el puerto que se usará en el backend
EXPOSE 3000

RUN npm run build
# Configurar la variable de entorno de MongoDB (opcional, si la necesitas)
# Si usas MongoDB Atlas o una base de datos propia
# ENV MONGODB_URL=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/mydb

# Comando para arrancar la aplicación (por defecto ejecuta "index.js", ajusta si tu archivo principal tiene otro nombre)
CMD ["npm", "start"]