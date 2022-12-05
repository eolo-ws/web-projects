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
