# Usa la imagen oficial de Nginx
FROM nginx:latest

# Copia los archivos de la página web a la carpeta de Nginx
COPY ./ /usr/share/nginx/html

# Expone el puerto 80 para servir la página
EXPOSE 80
