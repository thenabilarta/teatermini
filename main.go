package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/api", ApiHandler)

	http.Handle("/", r)

	srv := &http.Server{
		Handler: r,
		Addr:    ":4444",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	values := map[string]string{"username": "username", "password": "password"}

	jsonValue, _ := json.Marshal(values)
	w.WriteHeader(http.StatusOK)
	w.Write(jsonValue)
}

func ApiHandler(w http.ResponseWriter, r *http.Request) {
	values := map[string]string{"status": "ok"}

	jsonValue, _ := json.Marshal(values)
	w.WriteHeader(http.StatusOK)
	w.Write(jsonValue)
}
