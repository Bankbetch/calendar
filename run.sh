docker volume create mongo-data

docker network create proxy

docker-compose up -d

tar -xvf dump.tar.gz

docker exec -it mongo mongo --eval "rs.initiate()"

docker cp dump mongo:/data/

# rm -rf dump/

docker exec -it mongo mongorestore -u root -p rootpassword /data/dump

docker exec -it mongo rm -rf /data/dump
