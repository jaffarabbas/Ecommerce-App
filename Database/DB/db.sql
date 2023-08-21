
create database DB_JEWELSITE

CREATE TABLE ACCOUNT_TYPE (
  id  NOT NULL IDENTITY(1,1) PRIMARY KEY,
  name varchar(100) CNOT NULL
  ac_status BIT DEFAULT 1 NOT NULL,
)

--
-- Dumping data for table `account_type`
--

INSERT INTO ACCOUNT_TYPE (name) VALUES
('Normal'),
('Gold'),
('Premium'),
('Diamond');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE ADMIN (
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  name varchar(100) NOT NULL,
  password varchar(233) NOT NULL,
  image text NOT NULL,
  ac_status STATUS BIT DEFAULT 1 NOT NULL,
);

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`, `image`) VALUES
(1, 'jaffar', 'JaffarAbbas@123', '../vendor/images/admin.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE CATEGORIES (
  cid int(11) NOT NULL IDENTITY(1,1) PRIMARY KEY,
  cname varchar(255) NOT NULL,
  c_status STATUS BIT DEFAULT 1 NOT NULL,
);

--
-- Dumping data for table `categories`
--

INSERT INTO CATEGORIES (cname, status) VALUES
('latest Products', 1),
('Our Premium', 1),
('Artifical Products', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE CONTACT (
  conid INT NOT NULL IDENTITY(1,1) PRIMARY KEY
  name varchar(100) NOT NULL,
  email varchar(233) NOT NULL,
  phone varchar(100) NOT NULL,
  address varchar(255) NOT NULL,
  message varchar(max) NOT NULL,
  stamp DATETIME DEFAULT GETDATE() NOT NULL,
  co_status BIT DEFAULT 1 NOT NULL,
);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE PRODUCT (
  pid INT NOT NULL IDENTITY(1,1) PRIMARY KEY
  name varchar(100) NULL,
  description varchar(255) NULL,
  price DECIMAL(10,2) DEFAULT NULL,
  image VARCHAR(MAX) DEFAULT NULL,
  quantity int(100) DEFAULT NULL,
  status BIT DEFAULT 1 NOT NULL NOT NULL DEFAULT 1,
  created_on DATETIME DEFAULT GETDATE() NOT NULL,
  cid INT DEFAULT NULL,
  product_status BIT DEFAULT 1 NOT NULL,
);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE SETTING (
  TAX DECIMAL(10,2) NOT NULL
);

--
-- Dumping data for table `setting`
--

INSERT INTO setting (`TAX`) VALUES
(50);

-- --------------------------------------------------------

--
-- Stand-in structure for view `SHOW_TEMP_USER_ORDER_ALL_DATA`
-- (See below for the actual view)
--
CREATE TABLE SHOW_TEMP_USER_ORDER_ALL_DATA (
id INT IDENTITY(1,1) PRIMARY KEY
,user_token varchar(255)
,name varchar(100)
,email varchar(233)
,phone varchar(100)
,address varchar(250)
,iid int(100)
,quantity int(100)
,total_price DECIMAL(10,2)
,status BIT
,orderat datetime
,pid INT
,product name varchar(100)
,description varchar(255)
,price DECIMAL(10,2)
,image VARCHAR(MAX)
,product quantity int(100)
,product status BIT DEFAULT 1 NOT NULL
,created_on timestamp
,cid INT
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `SHOW_USER_ORDER_ALL_DATA`
-- (See below for the actual view)
--
CREATE TABLE SHOW_USER_ORDER_ALL_DATA (
oid INT IDENTITY(1,1) PRIMARY KEY
,user_id INT
,user_name varchar(201)
,email varchar(233)
,user_status BIT
,user_created datetime DEFAULT GETDATE() NOT NULL 
,uid int(100)
,iid int(233)
,order_quantity int(100)
,total_price DECIMAL(10,2)
,uo_status BIT
,order_created_at datetime
,product_id INT
,name varchar(100)
,image VARCHAR(MAX)
,price DECIMAL(10,2)
,inventory int(100)
,category INT
,product_status BIT DEFAULT 1 NOT NULL
,product_created_at timestamp
);

-- --------------------------------------------------------

--
-- Table structure for table `temp_user_orders`
--

CREATE TABLE TEMP_USER_ORDERS (
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY
  user_token varchar(255) NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(233) NOT NULL,
  phone varchar(100) NOT NULL,
  address varchar(250) NOT NULL,
  iid int(100) NOT NULL,
  quantity int(100) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status BIT NOT NULL DEFAULT 1,
  orderat datetime DEFAULT GETDATE() NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE TYPE (
  id int(11) NOT NULL IDENTITY(1,1) PRIMARY KEY
  name varchar(100) NOT NULL
);

--
-- Dumping data for table `type`
--

INSERT INTO TYPE (name) VALUES
('1'),
('2');

-- --------------------------------------------------------

--
-- Table structure for table users
--

CREATE TABLE USERS (
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(233) NOT NULL,
  password varchar(100) NOT NULL,
  actype varchar(100) NOT NULL,
  type varchar(100) NOT NULL,
  status BIT NOT NULL DEFAULT 1,
  created_at datetime DEFAULT GETDATE() NOT NULL 
);

-- --------------------------------------------------------

--
-- Table structure for table `user_orders`
--

CREATE TABLE USER_ORDERS (
  oid INT NOT NULL IDENTITY(1,1) PRIMARY KEY
  uid int(100) NOT NULL,
  iid int(233) NOT NULL,
  quantity int(100) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status BIT NOT NULL DEFAULT 1,
  created_at datetime NOT NULL DEFAULT GETDATE()
);

-- --------------------------------------------------------

--
-- Structure for view `SHOW_TEMP_USER_ORDER_ALL_DATA`
--
DROP TABLE IF EXISTS `SHOW_TEMP_USER_ORDER_ALL_DATA`;

CREATE ALGORITHM=UNDEFINED DEFINER=`id19130340_root`@`%` SQL SECURITY DEFINER VIEW `SHOW_TEMP_USER_ORDER_ALL_DATA`  AS  select `tu`.`id` AS `id`,`tu`.`user_token` AS `user_token`,`tu`.`name` AS `name`,`tu`.`email` AS `email`,`tu`.`phone` AS `phone`,`tu`.`address` AS `address`,`tu`.`iid` AS `iid`,`tu`.`quantity` AS `quantity`,`tu`.`total_price` AS `total_price`,`tu`.`status` AS `status`,`tu`.`orderat` AS `orderat`,`p`.`pid` AS `pid`,`p`.`name` AS `product name`,`p`.`description` AS `description`,`p`.`price` AS `price`,json_extract(`p`.`image`,'$[0]') AS `image`,`p`.`quantity` AS `product quantity`,`p`.`status` AS `product status`,`p`.`created_on` AS `created_on`,`p`.`cid` AS `cid` from (`temp_user_orders` `tu` join `products` `p` on(`tu`.`iid` = `p`.`pid`)) ;

-- --------------------------------------------------------

--
-- Structure for view `SHOW_USER_ORDER_ALL_DATA`
--
DROP TABLE IF EXISTS `SHOW_USER_ORDER_ALL_DATA`;

CREATE ALGORITHM=UNDEFINED DEFINER=`id19130340_root`@`%` SQL SECURITY DEFINER VIEW `SHOW_USER_ORDER_ALL_DATA`  AS  select `uo`.`oid` AS `oid`,`u`.`id` AS `user_id`,concat(`u`.`firstname`,'_',`u`.`lastname`) AS `user_name`,`u`.`email` AS `email`,`u`.`status` AS `user_status`,`u`.`created_at` AS `user_created`,`uo`.`uid` AS `uid`,`uo`.`iid` AS `iid`,`uo`.`quantity` AS `order_quantity`,`uo`.`total_price` AS `total_price`,`uo`.`status` AS `uo_status`,`uo`.`created_at` AS `order_created_at`,`p`.`pid` AS `product_id`,`p`.`name` AS `name`,json_extract(`p`.`image`,'$[0]') AS `image`,`p`.`price` AS `price`,`p`.`quantity` AS `inventory`,`p`.`cid` AS `category`,`p`.`status` AS `product_status`,`p`.`created_on` AS `product_created_at` from ((`user_orders` `uo` join `products` `p` on(`uo`.`iid` = `p`.`pid`)) join `users` `u` on(`uo`.`uid` = `u`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_type`
--
ALTER TABLE `account_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`conid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `product_to_categories` (`cid`);

--
-- Indexes for table `temp_user_orders`
--
ALTER TABLE `temp_user_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_token` (`user_token`),
  ADD KEY `tem_orders_to_products` (`iid`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_orders`
--
ALTER TABLE `user_orders`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `order_to_user` (`uid`),
  ADD KEY `orders_to_products` (`iid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_type`
--
ALTER TABLE `account_type`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `conid` INT NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pid` INT NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `temp_user_orders`
--
ALTER TABLE `temp_user_orders`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_orders`
--
ALTER TABLE `user_orders`
  MODIFY `oid` INT NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `product_to_categories` FOREIGN KEY (`cid`) REFERENCES `categories` (`cid`);

--
-- Constraints for table `temp_user_orders`
--
ALTER TABLE `temp_user_orders`
  ADD CONSTRAINT `tem_orders_to_products` FOREIGN KEY (`iid`) REFERENCES `products` (`pid`);

--
-- Constraints for table `user_orders`
--
ALTER TABLE `user_orders`
  ADD CONSTRAINT `order_to_user` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_to_products` FOREIGN KEY (`iid`) REFERENCES `products` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
