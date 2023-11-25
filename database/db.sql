CREATE DATABASE IF NOT EXISTS contractsdb;

USE contractsdb;

-- TABLE USER
-- all pasword wil be encrypted using SHA2

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(60) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) AUTO_INCREMENT=2;

-- drop table users

DESCRIBE users;

INSERT INTO users (id, email, password, fullname) 
  VALUES (1, 'john', 'john@gmail.com', 'John Carter');

SELECT * FROM users;

-- LINKS TABLE
CREATE TABLE contracts (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  contract VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE contracts
  ADD PRIMARY KEY (id);

ALTER TABLE contracts
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE contracts;