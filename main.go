package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/api/test", HomeHandler).Methods("POST")
	r.HandleFunc("/api/create", CreateHandler).Methods("POST")
	r.HandleFunc("/api/key", KeyHandler).Methods("GET")
	r.HandleFunc("/api/value", ValueHandler).Methods("POST")
	r.HandleFunc("/api/scripts", ScriptHandler).Methods("GET")
	r.HandleFunc("/api/scripts/{id}", ScriptShowHandler).Methods("GET")

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

// type Field struct {
// 	Field string `json:"field"`
// }

// func HomeHandler(w http.ResponseWriter, r *http.Request) {
// 	result := OpenConnection()

// 	// decoder := json.NewDecoder(r.Body)

// 	// var t Field

// 	// err := decoder.Decode(&t)

// 	// if err != nil {
// 	// 	panic(err)
// 	// }

// 	// log.Println(t.Field)

// 	// values := map[string]string{"username": "username", "password": "password"}

// 	jsonValue, _ := json.Marshal(result)
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(jsonValue)
// }

func CreateHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)

	var data struct {
		Data []Field `json:"data"`
	}

	err := decoder.Decode(&data)

	if err != nil {
		panic(err)
	}

	// log.Println(data.Data[1].Field)

	// for _, d := range data.Data {
	// 	fmt.Println(d)
	// }

	// str := data.Data[0]

	values := map[string]string{"username": "test", "password": "password"}

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

func OpenConnection() *gorm.DB {
	// db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/teatermini")

	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/teatermini"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	return db

	// var script Script

	// if err := db.Find(&script).Error; err != nil {
	// 	panic(err)
	// }

	// var script_text []Script_text

	// if err := db.Find(&script_text).Error; err != nil {
	// 	panic(err)
	// }

	// var fill_key []Fill_key

	// if err := db.Where("script_id = ?", 1).Find(&fill_key).Error; err != nil {
	// 	panic(err)
	// }

	// script.Content = script_text
	// script.Keys = fill_key

	// return script

	// for _, u := range script {
	// 	fmt.Println(u.Title)
	// }

	// if err != nil {
	// 	panic(err)
	// }

	// defer db.Close()

	// db.SetMaxIdleConns(10)
	// db.SetMaxOpenConns(100)
	// db.SetConnMaxIdleTime(5 * time.Minute)
	// db.SetConnMaxLifetime(60 * time.Minute)

	// var script []Script

	// db.QueryRow("SELECT id, title, created_by FROM script").Scan(&script.Id, &script.Title, &script.Created_by)

	// fmt.Println(script.Id)
	// fmt.Println(script.Title)
	// fmt.Println(script.Created_by)
}
