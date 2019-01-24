-- If grubhub schema does not exist, create it
CREATE SCHEMA IF NOT EXISTS grubhub AUTHORIZATION /*FILL_ME_IN*/;

-- Delete menu_items table if exists
-- DROP TABLE menu_items;

-- Create table for menu_items
CREATE TABLE menu_items (
  itemId INTEGER NOT NULL PRIMARY KEY,
  restaurantId INTEGER NOT NULL,
  category VARCHAR(150) NOT NULL,
  name VARCHAR(150) NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  pictureUrl TEXT,
  popular BOOLEAN NOT NULL,
  spicy BOOLEAN NOT NULL
);

-- Delete required_categories table if exists
-- DROP TABLE required_categories;

-- Create table for required_categories
CREATE TABLE required_categories (
  categoryId INTEGER NOT NULL PRIMARY KEY,
  categoryName TEXT NOT NULL,
  itemId INTEGER NOT NULL,
  FOREIGN KEY (itemId) REFERENCES menu_items (itemId) 
);

-- Delete required_choices table if exists
-- DROP TABLE required_choices;

-- Create table for required_choices
CREATE TABLE required_choices (
  reqChoiceId INTEGER NOT NULL PRIMARY KEY,
  reqChoiceName VARCHAR(150) NOT NULL,
  reqChoicePrice NUMERIC NOT NULL,
  categoryId INTEGER NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES required_categories (categoryId)
);

-- Delete optional_choices table if exists
-- DROP TABLE optional_choices;

-- Create table for optional_choices
CREATE TABLE optional_choices (
  optChoiceId INTEGER NOT NULL PRIMARY KEY,
  optChoiceName VARCHAR(150) NOT NULL,
  optChoicePrice NUMERIC NOT NULL,
  itemId INTEGER NOT NULL,
  FOREIGN KEY (itemId) REFERENCES menu_items (itemId)
);
