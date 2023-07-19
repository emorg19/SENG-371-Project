/*
*********************************************************************
Group 13 Database basic setup
*********************************************************************
Version 1.0: Basic setup + user table
*********************************************************************
*/

CREATE DATABASE IF NOT EXISTS `bank_db`;

USE `bank_db`;

-- create the users for each database
CREATE USER 'user'@'localhost' IDENTIFIED BY 'pass';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;
