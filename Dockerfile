FROM node:8.11.1

WORKDIR /user/src/dockerapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]