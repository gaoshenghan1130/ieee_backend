CREATE DATABASE IF NOT EXISTS pointSys;

USE ieee_pointSys;

CREATE TABLE IF NOT EXISTS users (
    unique_name VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100),
    point INT
);

CREATE TABLE IF NOT EXISTS admins (
    username VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(255)
);

INSERT INTO admins (username, name, password) VALUES
    ('gsh', 'Gao Shenghan', 'hashed_password1');

INSERT INTO users (unique_name, name, point) VALUES
    ('user1', 'Alice', 100),
    ('user2', 'Bob', 150),
    ('user3', 'Charlie', -10),
    ('user4', 'Diana', 250);