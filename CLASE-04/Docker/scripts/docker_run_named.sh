# --name your containers
docker run -t --name py1 python:p python3 -c "print('One')"
docker run -t --name py1 python:p python3 -c "print('Two')"  # error
docker rm $(docker ps -q -n 1)
docker run -t --name py1 python:p python3 -c "print('Three')"  # no error
docker rm $(docker ps -q -n 1)
# now with --rm, will remove on stop
docker run -t --rm --name py1 python:p python3 -c "print('Four')"
docker run -t --rm --name py1 python:p python3 -c "print('Five')"
docker run -t --rm --name py1 python:p python3 -c "print('Six')"
docker ps -a --filter ancestor=python:slim-buster
docker logs py1 # error, was removed