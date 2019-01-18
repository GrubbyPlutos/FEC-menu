const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/postgresql/index');
// const db = require('../database/cassandra/index');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

// Get all menu items of a certain restaurant
app.get('/restaurants/:id/menu-items', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const fullMenu = await db.getFullMenu([restaurantId]);
    console.log('Retrieved from database:');
    res.status(200).send(fullMenu);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Get all categories and choices of a specific menu item in a restaurant
app.get('/restaurants/:id/menu-items/:itemId', async (req, res) => {
  try {
    const menuItem = await db.getMenuItem([req.params.id, req.params.itemId]);
    res.send(menuItem);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Submit an order
app.post('/restaurants/:id/order', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
