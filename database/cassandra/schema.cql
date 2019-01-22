CREATE KEYSPACE grubhub
    WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE grubhub;

CREATE TABLE menu_items (
  itemId int,
  restaurantId int,
  category text,
  name text,
  price decimal,
  description text,
  pictureUrl text,
  popular boolean,
  spicy boolean,
  required text,
  optional text
  PRIMARY KEY (itemId, restaurantId),
)
WITH CLUSTERING ORDER BY (restaurantId ASC);

COPY menu_items(itemId,restaurantId,category,name,price,description,pictureUrl,popular,spicy,required,optional) 
    FROM '/Users/phdickson/Desktop/SDC/FEC-menu/database/cassandra/dataGenerationScripts/menuItemsCassandra.csv' 
    WITH DELIMITER='~' AND HEADER=TRUE;
