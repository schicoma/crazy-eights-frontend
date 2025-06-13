# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --base-href /

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Copy the Nginx configuration file
# Make sure the path matches where you put your nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Angular build output to the Nginx html directory
# Adjust 'dist/your-app-name' to your actual Angular output folder
COPY --from=build /app/dist/crazy-eights /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]