package city

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func Movies(w http.ResponseWriter, r *http.Request) {

	SetupHeader(&w, r)
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

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	w.Write(body)
}
