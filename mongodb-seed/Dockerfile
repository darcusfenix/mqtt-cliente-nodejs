FROM mongo:latest
MAINTAINER Juan Crisostomo

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . /opt/app


#RUN mongodump  -h 192.168.69.27 --port 27017 -d TManagerPoC  -o databaseBackup
CMD mongoimport --host mongodb --db "pets" --collection "pets" --type json --file "pets.json" --jsonArray
