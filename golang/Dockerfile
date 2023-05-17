
FROM golang:alpine AS build

# GOPROXY resolves dependencies treefrom cache or repository
ENV GOPROXY=https://proxy.golang.org

WORKDIR /go/src/api
COPY . .
# Set OS as linux
RUN GOOS=linux go build -o /go/bin/api main.go

FROM alpine
COPY --from=build /go/bin/api /go/bin/api
ENTRYPOINT ["go/bin/api"]