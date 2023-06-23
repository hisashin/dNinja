FROM debian:sid

# Create app directory
WORKDIR /usr/src/app

RUN apt update
RUN apt -y upgrade
RUN apt -y install nodejs npm kicad

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY app/ /usr/src/app/

EXPOSE 8080
CMD [ "node", "server.mjs" ]
