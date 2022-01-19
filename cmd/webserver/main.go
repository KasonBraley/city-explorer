package main

import (
	"city-explorer"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	server := city.NewCityServer()

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), server))
}
