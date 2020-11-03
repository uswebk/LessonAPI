-- CREATE TABLE
CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  profile TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  date_of_birth TEXT
);

-- INSERT Data
INSERT INTO users (name, profile) VALUES ("user1", "hello");
INSERT INTO users (name, profile) VALUES ("user2", "good morning");
INSERT INTO users (name, profile) VALUES ("user3", "good night");
INSERT INTO users (name, profile) VALUES ("user4", "nice to meet you");
INSERT INTO users (name, profile) VALUES ("user5", "best");