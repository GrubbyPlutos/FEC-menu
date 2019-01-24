const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'grubhub',
});

client.connect((err) => {
  if (err) {
    return console.log('Error', err);
  }
  console.log('Connected to Cassandra');
})

const getFullMenu = async (params) => {
  let queryString = `SELECT * FROM menu_items WHERE restaurantid = ?`
  try {
    const fullMenu = await client.execute(queryString, params, { prepare: true });
    return fullMenu.rows;
  } catch (err) {
    console.log('Unable to get menu', err);
    return err;
  }
}

const getMenuItem = async (params) => {
  let queryString = `SELECT * FROM menu_items WHERE restaurantid = ? AND itemid = ?`;
  try {
    const menuItem = await client.execute(queryString, params, { prepare: true });
    return menuItem.rows[0];
  } catch (err) {
    console.log('Unable to get menu item information', err);
    return err;
  }
}

module.exports = {
  getFullMenu,
  getMenuItem,
}
