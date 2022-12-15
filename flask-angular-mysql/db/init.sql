CREATE DATABASE tasks;
USE tasks;

CREATE TABLE procs
(
  id                    INT unsigned NOT NULL AUTO_INCREMENT,
  process               VARCHAR(150) NOT NULL,                
  pid                   INT unsigned NOT NULL,                
  cpu                   FLOAT unsigned NOT NULL,                      
  mem                   FLOAT unsigned NOT NULL,                        
  PRIMARY KEY           (id)                                  
);

CREATE TABLE header
(
  id                    INT unsigned NOT NULL AUTO_INCREMENT,
  process               INT unsigned NOT NULL,                               
  cpu                   FLOAT unsigned NOT NULL,                      
  mem                   FLOAT unsigned NOT NULL,      
  ts                    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,                   
  PRIMARY KEY           (id)                                 
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  hash VARCHAR(255) NOT NULL
);

INSERT INTO users (username, hash) VALUES ('1234', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');
