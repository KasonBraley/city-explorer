package city

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func Weather(w http.ResponseWriter, r *http.Request) {
	SetupHeader(&w, r)
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

	body, err := io.ReadAll(resp.Body)
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

	w.Write(bytes)
}
