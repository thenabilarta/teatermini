package main

type Script struct {
	Id               string        `json:"id"`
	Script_master_id int           `json:"script_master_id"`
	Title            string        `json:"title"`
	Speaker_1        string        `json:"speaker_1"`
	Speaker_2        string        `json:"speaker_2"`
	Created_by       string        `json:"created_by"`
	Created_by_id    int           `json:"created_by_id"`
	Created_at       int64         `json:"created_at"`
	Content          []Script_text `json:"content" gorm:"foreignKey:Script_master_id;"`
	Value            []Fill_value  `json:"value" gorm:"foreignKey:script_id;"`
	// Keys             []Fill_key    `json:"keys" gorm:"foreignKey:script_id;"`
}

type Script_text struct {
	Id               int    `json:"id"`
	Script_master_id int    `json:"script_master_id"`
	Line             int    `json:"line"`
	Speaker          int    `json:"speaker"`
	Text             string `json:"text"`
	To_fill          int    `json:"to_fill"`
}

type Fill_key struct {
	Id               string `json:"id"`
	Script_master_id int    `json:"script_master_id"`
	Line             int    `json:"line"`
	Sequence         int    `json:"Sequence"`
	Content          string `json:"Content"`
}

type Fill_value struct {
	Script_id string `json:"script_id"`
	Line      int    `json:"line"`
	Sequence  int    `json:"Sequence"`
	Content   string `json:"Content"`
}

type CreateFillRequest struct {
	Script_master_id int `json:"script_master_id"`
	Fields           []Field
}

type Field struct {
	Key   int    `json:"key"`
	Value string `json:"value"`
}
