package main

import (
	"city-explorer"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func root(w http.ResponseWriter, r *http.Request) {

	city.SetupHeader(&w, r)
	data := []byte("These are not the bugs you are looking for")
	w.Write(data)
}

func main() {

	http.HandleFunc("/", root)
	http.HandleFunc("/weather", city.Weather)
	http.HandleFunc("/movies", city.Movies)
	http.HandleFunc("/location", city.Location)
	http.HandleFunc("/location/image", city.LocationImage)

	// starts our server, wrapped in log.Fatal in case an error is encountered
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}
