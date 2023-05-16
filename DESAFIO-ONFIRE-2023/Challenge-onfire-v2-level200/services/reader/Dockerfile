FROM golang
WORKDIR /go/src/github.com/services/go
ADD . /go/src/github.com/services/go

RUN go mod init 
RUN go get github.com/rs/cors
RUN go get github.com/go-redis/redis
RUN go build

EXPOSE 8080

ENTRYPOINT ["go","run","main.go"]
