
INSERT INTO ACCOUNT_TYPE (name) VALUES
('Normal'),
('Gold'),
('Premium'),
('Diamond');

INSERT INTO ADMIN (name, password, image) VALUES
('jaffar', 'JaffarAbbas@123', '../vendor/images/admin.jpg');

INSERT INTO CATEGORIES (cname, c_status) VALUES
('latest Products', 1),
('Our Premium', 1),
('Artifical Products', 1);


INSERT INTO setting (TAX) VALUES
(50);


INSERT INTO USERS (firstname,lastname,email,password,acid) VALUES('t','t','abc@abc.com','12345678',1)

select * from Product 

update PRODUCT set image = 'assets/images/productPic1.png'
