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

	r.HandleFunc("/test", HomeHandler)

	// r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./client/dist/assets/"))))

	r.PathPrefix("/").HandlerFunc(CatchAllHandler)

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

func CatchAllHandler(w http.ResponseWriter, r *http.Request) {
	// values := map[string]string{"test": "username", "password": "password"}

	// jsonValue, _ := json.Marshal(values)
	// w.WriteHeader(http.StatusOK)
	// w.Write(jsonValue)

	// fmt.Println(r.URL.Path)
	// p := "." + r.URL.Path
	// if p == "./" {
	// 	p = "./static/index.html"
	// }

	http.ServeFile(w, r, "./client/dist/index.html")
	// http.FileServer(http.Dir("./index.html"))
}
