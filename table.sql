CREATE TABLE users (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE scripts (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `script_master_id` int NOT NULL,
  `speaker_1` varchar(255) NOT NULL,
  `speaker_2` varchar(255) NOT NULL,
  `created_by` varchar(255),
  `created_by_id` int,
  `created_at` bigint NOT NULL
);

CREATE TABLE script_masters (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL
);

CREATE TABLE script_texts (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `script_master_id` int NOT NULL,
  `line` int NOT NULL,
  `speaker` int NOT NULL,
  `text` text NOT NULL,
  `to_fill` int NOT NULL
);

CREATE TABLE fill_keys (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `script_id` int NOT NULL,
  `line` int NOT NULL,
  `sequence` int NOT NULL,
  `content` text NOT NULL
);

CREATE TABLE fill_values (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `script_id` int NOT NULL,
  `fill_key_id` int NOT NULL,
  `sequence` int NOT NULL,
  `content` text NOT NULL
);
