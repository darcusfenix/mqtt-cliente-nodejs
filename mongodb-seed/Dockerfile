FROM mongo:latest
MAINTAINER Juan Crisostomo

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . /opt/app


RUN mongodump  -h 192.168.69.27 --port 27017 -d TManagerPoC  -o databaseBackup
CMD mongorestore --host mongodb --drop -d TManagerPoC  databaseBackup/TManagerPoC
