package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis"
	"github.com/rs/cors"
)

func main() {
	redis_host := "redis"
	redis_port := "6379"
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(writer http.ResponseWriter, request *http.Request) {
		if request.Method == "OPTIONS" {
			writer.WriteHeader(http.StatusOK)
			return
		}
		fmt.Fprintf(writer, "up")
	})

	mux.HandleFunc("/data", func(writer http.ResponseWriter, request *http.Request) {
		client := redis.NewClient(&redis.Options{Addr: redis_host + ":" + redis_port})
		key, err := client.Get("295devops").Result()
		if err != nil {
			panic(err)
		}
		fmt.Fprintf(writer, key)
	})

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"*"},
	}).Handler(mux)

	log.Fatal(http.ListenAndServe(":8080", handler))

}
