CREATE DATABASE intranet;
USE intranet;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  hash VARCHAR(255) NOT NULL
  level INT NOT NULL,
);

INSERT INTO users (username, hash) VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',1);