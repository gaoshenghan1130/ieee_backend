CREATE DATABASE IF NOT EXISTS pointSys;

USE pointSys;

CREATE TABLE IF NOT EXISTS users (
    unique_name VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100),
    point INT
);

-- INSERT INTO users (unique_name, name, point) VALUES
--     ('user1', 'Alice', 100),
--     ('user2', 'Bob', 150),
--     ('user3', 'Charlie', -10),
--     ('user4', 'Diana', 250);