package city

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type CityServer struct {
	http.Handler
}

func NewCityServer() *CityServer {
	c := new(CityServer)

	router := http.NewServeMux()

	router.Handle("/", http.HandlerFunc(c.rootHandler))
	router.Handle("/weather", http.HandlerFunc(c.weatherHandler))
	router.Handle("/movies", http.HandlerFunc(c.movieHandler))
	router.Handle("/location", http.HandlerFunc(c.locationHandler))
	router.Handle("/location/image", http.HandlerFunc(c.locationMapHandler))

	c.Handler = router

	return c
}

func (c *CityServer) rootHandler(w http.ResponseWriter, r *http.Request) {
	data := []byte("These are not the bugs you are looking for")
	setupHeader(&w, r)
	w.Write(data)
}

func (c *CityServer) weatherHandler(w http.ResponseWriter, r *http.Request) {
	apiKey := getEnvVar("WEATHER_API_KEY")

	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")
	url := fmt.Sprintf("https://api.weatherbit.io/v2.0/current/?lat=%s&lon=%s&key=%s&days=3", lat, lon, apiKey)

	body := getData(url)

	var data WbResponse

	jsonErr := json.Unmarshal(body, &data)
	if jsonErr != nil {
		fmt.Println(jsonErr)
	}

	bytes, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
	}

	setupHeader(&w, r)
	w.Write(bytes)
}

func (c *CityServer) movieHandler(w http.ResponseWriter, r *http.Request) {
	movieName := r.URL.Query().Get("city")

	apiKey := getEnvVar("MOVIE_API_KEY")
	url := fmt.Sprintf("https://api.themoviedb.org/3/search/movie?api_key=%s&query=%s", apiKey, movieName)

	body := getData(url)
	setupHeader(&w, r)
	w.Write(body)
}

func (c *CityServer) locationHandler(w http.ResponseWriter, r *http.Request) {
	movieName := r.URL.Query().Get("city")

	apiKey := getEnvVar("LOCATION_API_KEY")
	url := fmt.Sprintf("https://us1.locationiq.com/v1/search.php?key=%s&q=%s&format=json&limit=1", apiKey, movieName)

	body := getData(url)
	setupHeader(&w, r)
	w.Write(body)
}

func (c *CityServer) locationMapHandler(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	apiKey := getEnvVar("LOCATION_API_KEY")
	url := fmt.Sprintf("https://maps.locationiq.com/v3/staticmap?key=%s&center=%s,%s", apiKey, lat, lon)

	body := getData(url)

	setupHeader(&w, r)
	w.Header().Set("Content-Type", "image/png")
	w.Write(body)
}

func setupHeader(w *http.ResponseWriter, r *http.Request) {
	(*w).Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func getEnvVar(name string) string {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	apiKey := os.Getenv(name)
	return apiKey
}

func getData(url string) []byte {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Response status:", resp.Status)

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	return body
}
