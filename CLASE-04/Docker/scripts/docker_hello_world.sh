# hello-world distro-less one-off container

docker run hello-world
docker run -d hello-world  # detached, no prompt
docker logs $(docker ps -l -q)  # logs fort the previous call
docker run --name say_hello hello-world
docker logs say_hello | pyg
docker run --name say_hello hello-world  # error
docker restart hello_world  # mind that exec is always detached
docker run -it hello-world /bin/bash  # error, no terminal