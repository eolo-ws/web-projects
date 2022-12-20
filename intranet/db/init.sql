CREATE DATABASE intranet;
USE intranet;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  hash VARCHAR(255) NOT NULL,
  level INT NOT NULL
);

INSERT INTO users (username, hash,level) VALUES 
('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',1),
('test','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',2),
('test2','60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752',2);