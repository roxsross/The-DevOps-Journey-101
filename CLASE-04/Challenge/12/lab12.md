# LAB13 Example Voting App by Docker

A simple distributed application running across multiple Docker containers.

## Architecture

![Architecture diagram](architecture.excalidraw.png)

* A front-end web app in [Python](/vote) which lets you vote between two options
* A [Redis](https://hub.docker.com/_/redis/) which collects new votes
* A [.NET](/worker/) worker which consumes votes and stores them in…
* A [Postgres](https://hub.docker.com/_/postgres/) database backed by a Docker volume
* A [Node.js](/result) web app which shows the results of the voting in real time

## Notes

[Fuente](https://github.com/dockersamples/example-voting-app)

### Entrega

- Documentación
- Print de Pantalla de la solución
- Dockerfile
- Docker-compose