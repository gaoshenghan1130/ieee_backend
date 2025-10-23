FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# copy project files
COPY . .

# expose service port (if your index.js uses 3000, change to the corresponding port)
EXPOSE 3000

# start service
CMD ["npm", "start"]