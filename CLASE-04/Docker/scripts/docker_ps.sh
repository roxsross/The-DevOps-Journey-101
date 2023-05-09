docker ps --help
docker ps
docker ps -a --format '{{.Names}}' | sort
docker ps -a  # --all
docker ps -a -q | wc -l  # number of containers
docker ps -a --filter status=exited
docker ps -a --filter ancestor=hello-wold
docker ps -a --filter ancestor=python:slim-buster
docker ps -l  # last
docker ps -n 10  # last 10
# use --no-trunc to avoid cut strings