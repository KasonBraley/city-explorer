package city

import "net/http"

func SetupHeader(w *http.ResponseWriter, r *http.Request) {
	(*w).Header().Set("Content-Type", "text/plain; charset=utf-8")
	// w.Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
