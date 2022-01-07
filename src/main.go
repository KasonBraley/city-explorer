package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func root(w http.ResponseWriter, r *http.Request) {

	setupHeader(&w, r)
	data := []byte("These are not the bugs you are looking for")
	w.Write(data)
}

func weather(w http.ResponseWriter, r *http.Request) {
	setupHeader(&w, r)
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	apiKey := os.Getenv("WEATHER_API_KEY")

	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	url := fmt.Sprintf("https://api.weatherbit.io/v2.0/current/?lat=%s&lon=%s&key=%s&days=3", lat, lon, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response status:", resp.Status)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	var data WbResponse

	jsonErr := json.Unmarshal(body, &data)
	if jsonErr != nil {
		fmt.Println(err)
	}

	bytes, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
	}

	w.Write([]byte(bytes))
}

func movies(w http.ResponseWriter, r *http.Request) {

	setupHeader(&w, r)
	movieName := r.URL.Query().Get("city")

	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	apiKey := os.Getenv("MOVIE_API_KEY")
	url := fmt.Sprintf("https://api.themoviedb.org/3/search/movie?api_key=%s&query=%s", apiKey, movieName)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response status:", resp.Status)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	w.Write([]byte(body))
}

func location(w http.ResponseWriter, r *http.Request) {

	setupHeader(&w, r)
	movieName := r.URL.Query().Get("city")

	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	apiKey := os.Getenv("LOCATION_API_KEY")

	url := fmt.Sprintf("https://us1.locationiq.com/v1/search.php?key=%s&q=%s&format=json&limit=1", apiKey, movieName)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response status:", resp.Status)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	w.Write([]byte(body))
}

func setupHeader(w *http.ResponseWriter, r *http.Request) {
	(*w).Header().Set("Content-Type", "text/plain; charset=utf-8")
	// w.Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {

	http.HandleFunc("/", root)
	http.HandleFunc("/weather", weather)
	http.HandleFunc("/movies", movies)
	http.HandleFunc("/location", location)

	// starts our server, wrapped in log.Fatal in case an error is encountered
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}
