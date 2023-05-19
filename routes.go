package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"math"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	// result := OpenConnection()

	// jsonValue, _ := json.Marshal(result)
	// w.WriteHeader(http.StatusOK)
	// w.Write(jsonValue)
}

func KeyHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	// var script Script

	// if err := db.Find(&script).Error; err != nil {
	// 	panic(err)
	// }

	var fill_key []Fill_key

	if err := db.Where("script_master_id = ?", 1).Find(&fill_key).Error; err != nil {
		panic(err)
	}

	// var fill_key []Fill_key

	// if err := db.Where("script_id = ?", 1).Find(&fill_key).Error; err != nil {
	// 	panic(err)
	// }

	// script.Content = script_text
	// script.Keys = fill_key

	// return script

	jsonValue, _ := json.Marshal(fill_key)
	w.WriteHeader(http.StatusOK)
	w.Write(jsonValue)
}

func randomBase16String(l int) string {
	buff := make([]byte, int(math.Ceil(float64(l)/2)))
	rand.Read(buff)
	str := hex.EncodeToString(buff)
	return str[:l] // strip 1 extra character we get from odd length results
}

func ScriptHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	var script []Script

	if err := db.Find(&script).Error; err != nil {
		panic(err)
	}

	var fill_value []Fill_value

	if err := db.Find(&fill_value).Error; err != nil {
		panic(err)
	}

	var script_text []Script_text

	if err := db.Find(&script_text).Error; err != nil {
		panic(err)
	}

	for i, s := range script {
		var scriptContent []Fill_value

		for _, fv := range fill_value {
			if s.Id == fv.Script_id {
				scriptContent = append(scriptContent, fv)
			}
		}

		script[i].Value = scriptContent
	}

	for i, s := range script {
		for j, st := range script_text {

			if s.Script_master_id == st.Script_master_id {
				if i == j {
					script[i].Content = append(script[i].Content, script_text...)
				}
			}

		}
	}

	// script.Content = script_text
	// script.Keys = fill_key

	// return script

	jsonValue, _ := json.Marshal(script)
	w.WriteHeader(http.StatusOK)
	w.Write(jsonValue)
}

func ScriptShowHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	scriptID := mux.Vars(r)["id"]

	var script []Script

	if err := db.Where("id = ?", scriptID).Find(&script).Error; err != nil {
		panic(err)
	}

	var fill_value []Fill_value

	if err := db.Find(&fill_value).Error; err != nil {
		panic(err)
	}

	var script_text []Script_text

	if err := db.Find(&script_text).Error; err != nil {
		panic(err)
	}

	for i, s := range script {
		var scriptContent []Fill_value

		for _, fv := range fill_value {
			if s.Id == fv.Script_id {
				scriptContent = append(scriptContent, fv)
			}
		}

		script[i].Value = scriptContent
	}

	for i, s := range script {
		for j, st := range script_text {

			if s.Script_master_id == st.Script_master_id {
				if i == j {
					script[i].Content = append(script[i].Content, script_text...)
				}
			}

		}
	}

	// script.Content = script_text
	// script.Keys = fill_key

	// return script

	jsonValue, _ := json.Marshal(script)
	w.WriteHeader(http.StatusOK)
	w.Write(jsonValue)
}

func ValueHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	randomString := randomBase16String(16)

	db.Create(&Script{
		Id:               randomString,
		Script_master_id: 1,
		Speaker_1:        "guru",
		Speaker_2:        "murid",
		Created_by:       "Nabil",
		Created_at:       time.Now().UnixMilli(),
	})

	decoder := json.NewDecoder(r.Body)

	var createFillRequest CreateFillRequest

	if err := decoder.Decode(&createFillRequest); err != nil {
		panic(err)
	}

	master_id := createFillRequest.Script_master_id

	var fill_key []Fill_key

	if err := db.Where("script_master_id = ?", master_id).Find(&fill_key).Error; err != nil {
		panic(err)
	}

	for i, fk := range fill_key {
		for j, fv := range createFillRequest.Fields {

			if i == j {
				db.Create(&Fill_value{
					Script_id: randomString,
					Line:      fk.Line,
					Sequence:  fk.Sequence,
					Content:   fv.Value,
				})
			}

		}
	}

	jsonValue, _ := json.Marshal(1)
	w.WriteHeader(http.StatusOK)
	w.Write(jsonValue)
}
