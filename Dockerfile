FROM node:16

WORKDIR /c/Users/Yurandier/Desktop/Cliente C1

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY environments/.env.development /app_rest/
COPY environments/.env.production /app_rest/
COPY environments/.env.test /app_rest/


RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:test" ]

