const { Client } = require('pg');

const client = new Client({
  database: 'sdc',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    return console.log('Error', err);
  }
  console.log('Connected to PostgreSQL')
});

// Get all menu items of a specific restaurant
const getFullMenu = async (params) => {
  let queryString = `SELECT * FROM menu_items WHERE restaurantid = $1`;
  try {
    const fullMenu = await client.query(queryString, params);
    return fullMenu.rows;
  } catch (err) {
    console.log('Unable to get menu', err);
    return err;
  }
}

// Get all information and choices for a specific menu item
const getMenuItem = async (params) => {
  let queryString = `SELECT * FROM menu_items \
                       LEFT JOIN required_categories ON menu_items.itemid = required_categories.itemid \
                       LEFT JOIN required_choices ON required_categories.categoryid = required_choices.categoryid \
                       LEFT JOIN optional_choices ON menu_items.itemid = optional_choices.itemid \
                       WHERE menu_items.restaurantid = $1 AND menu_items.itemid = $2`;
  try {
    const menuItem = await client.query(queryString, params);
    return menuItem.rows;
  } catch (err) {
    console.log('Unable to get menu item information', err);
    return err;
  }
}

module.exports = {
  getFullMenu,
  getMenuItem,
}

