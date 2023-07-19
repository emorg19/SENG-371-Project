
#!/bin/bash

# ################################# W A R N I N G ####################################################################
# This DockerFile is used for deployments only, please do not change for other purposes. It will break our deployment.
# ####################################################################################################################

FROM node:14

ENV HOME=/usr/src/app

RUN mkdir -p $HOME

WORKDIR $HOME

# Copy the package files only
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY ./package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Copy the rest of the files
COPY . ./

# Build app
# RUN npm run build

EXPOSE 3000

# RUN APP
CMD ["npm", "run", "dev"]
