# python3 over Debian Buster (10), slim version
# no entrypoint, only command, has bash

docker inspect python:slim-buster | jq -C | less -R
docker tag  python:slim-buster python:p
docker run -t  python:p python3 -c "print('One')"
docker run -t --entrypoint python3 python:p -c "print('Two')"
docker run -t --entrypoint "ls" python:p

docker restart $(docker ps -n 1 -q)
docker logs $(docker ps -n 1 -q)
docker rm $(docker ps -a --filter ancestor=python:slim-buster)

docker run -it python:p /bin/bash