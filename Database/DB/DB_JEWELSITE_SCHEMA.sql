
--create database DB_JEWELSITE
use DB_JEWELSITE

CREATE TABLE ACCOUNT_TYPE (
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  name varchar(100) NOT NULL,
  ac_status BIT DEFAULT 1 NOT NULL,
)

CREATE TABLE ADMIN (
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  name varchar(100) NOT NULL,
  password varchar(233) NOT NULL,
  image text NOT NULL,
  ac_status BIT DEFAULT 1 NOT NULL,
);

CREATE TABLE CATEGORIES (
  cid INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  cname varchar(255) NOT NULL,
  c_status BIT DEFAULT 1 NOT NULL,
);

CREATE TABLE CONTACT (
  conid INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email varchar(233) NOT NULL,
  phone varchar(100) NOT NULL,
  address varchar(255) NOT NULL,
  message varchar(max) NOT NULL,
  stamp DATETIME DEFAULT GETDATE() NOT NULL,
  co_status BIT DEFAULT 1 NOT NULL,
);

CREATE TABLE PRODUCT (
  pid INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  name varchar(100) NULL,
  description varchar(255) NULL,
  price DECIMAL(10,2) NULL,
  image varchar(MAX) NULL,
  quantity INT DEFAULT NULL,
  created_on DATETIME DEFAULT GETDATE() NOT NULL,
  cid INT DEFAULT NULL,
  product_status BIT DEFAULT 1 NOT NULL,
);


CREATE TABLE SETTING (
  TAX DECIMAL(10,2) NOT NULL
);

CREATE TABLE TEMP_USER_ORDERS (
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  user_token varchar(255) UNIQUE NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(233) NOT NULL,
  phone varchar(100) NOT NULL,
  address varchar(250) NOT NULL,
  pid INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  tm_status BIT NOT NULL DEFAULT 1,
  orderat datetime DEFAULT GETDATE() NOT NULL
);

CREATE TABLE USERS (
  uid INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(233) NOT NULL,
  password varchar(100) NOT NULL,
  acid INT NOT NULL,
  u_status BIT NOT NULL DEFAULT 1,
  created_at datetime DEFAULT GETDATE() NOT NULL 
);

CREATE TABLE USER_ORDERS (
  oid INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  uid int NOT NULL,
  pid int NOT NULL,
  quantity int NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status BIT NOT NULL DEFAULT 1,
  created_at datetime NOT NULL DEFAULT GETDATE()
);

CREATE TABLE REFRESH_TOKEN
(
	rid INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    ruid INT NOT NULL,
    refresh_token NVARCHAR(MAX) NOT NULL,
    rstatus BIT DEFAULT 1 NOT NULL,
	rcreatedat datetime NOT NULL DEFAULT GETDATE()
)
