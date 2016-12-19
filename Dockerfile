FROM node:latest
MAINTAINER Juan Crisostomo

RUN mkdir -p /opt/app
COPY . /opt/app
RUN cd /opt/app && npm install

WORKDIR /opt/app


RUN echo '{ "allow_root": true}' > /root/.bowerrc
CMD ["npm", "run", "build"]
