CREATE TABLE Users (
  id VARCHAR(100) PRIMARY KEY,
  login VARCHAR(100) not null,
  password VARCHAR(100) not null,
  age NUMERIC
);

INSERT INTO Users (id,login,password,age)
VALUES (1,'Elena','123456',34),(2,'Nikolay','654321',22),(3,'Mikhail','qwerty',28),(4,'Max','aqws123',27),(5,'Anrey','',30);

CREATE TABLE Groups (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) not null,
  permissions text[]
);

INSERT INTO Groups (id,name,permissions)
VALUES (1,'Admin',ARRAY['READ','WRITE','DELETE','SHARE','UPLOAD_FILES']), (2,'User',ARRAY['READ','SHARE']), (3,'Manager',ARRAY['READ','WRITE','SHARE','UPLOAD_FILES']);