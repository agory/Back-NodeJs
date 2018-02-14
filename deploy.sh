#!/bin/sh

host="codev.polytech-info.fr"
user="root"
workdir="/home/codev/"

ssh ${user}@${host} mkdir ${workdir} -p
scp docker-compose.yml ${user}@${host}:${workdir}

ssh ${user}@${host} "cd ${workdir}; docker-compose pull"
ssh ${user}@${host} "cd ${workdir}; docker-compose down"
ssh ${user}@${host} "cd ${workdir}; docker-compose up -d"

exit