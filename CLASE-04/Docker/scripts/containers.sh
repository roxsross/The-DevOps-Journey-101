docker run --help | less

# command list
docker run $container_name  # attached
docker ps
docker top
docker stats
docker stop
docker restart
docker kill


# hello-world
docker run hello-world
docker run -d hello-world ## atatched
docker run --name say_hello hello-world
docker logs say_hello | pyg
docker run --name say_hello hello-world  # error