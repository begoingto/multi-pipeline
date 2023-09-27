from node:18.12.1 as build 
workdir /app
copy ./ ./ 
run npm install --force 
run npm run build 


# section two 
FROM nginx:1.23.2
run ls -lrt
COPY --from=build /app/build /usr/share/nginx/html 

EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]



 
