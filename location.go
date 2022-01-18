package city

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func Location(w http.ResponseWriter, r *http.Request) {

	SetupHeader(&w, r)
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

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	w.Write(body)
}

func LocationImage(w http.ResponseWriter, r *http.Request) {
	SetupHeader(&w, r)
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	apiKey := os.Getenv("LOCATION_API_KEY")

	url := fmt.Sprintf("https://maps.locationiq.com/v3/staticmap?key=%s&center=%s,%s", apiKey, lat, lon)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "image/png")
	w.Write(body)
}
