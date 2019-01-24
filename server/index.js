require('newrelic');
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
app.get('/restaurants/:id/menu_items', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const fullMenu = await db.getFullMenu([restaurantId]);
    console.log('Retrieved from database:');
    let clientFullMenu = [];
    for (let i = 0; i < fullMenu.length; i++) {
      let clientMenuItem = {};
      let item = fullMenu[i];
      clientMenuItem['itemId'] = item.itemid;
      clientMenuItem['restaurantId'] = item.restaurantid;
      clientMenuItem['category'] = item.category;
      clientMenuItem['name'] = item.name;
      clientMenuItem['price'] = Number(item.price);
      clientMenuItem['description'] = item.description;
      clientMenuItem['pictureUrl'] = item.pictureurl;
      clientMenuItem['popular'] = item.popular;
      clientMenuItem['spicy'] = item.spicy;
      clientFullMenu.push(clientMenuItem);
    }
    res.status(200).send(clientFullMenu);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get all categories and choices of a specific menu item in a restaurant
app.get('/restaurants/:id/menu_items/:itemId', async (req, res) => {
  try {
    const menuItem = await db.getMenuItem([req.params.id, req.params.itemId]);
    const menuItemInfo = menuItem[0];
    let clientMenuItem = {
      itemId: menuItemInfo.itemid,
      restaurantId: menuItemInfo.restaurantid,
      category: menuItemInfo.category,
      name: menuItemInfo.name,
      price: Number(menuItemInfo.price),
      description: menuItemInfo.description,
      pictureUrl: menuItemInfo.pictureurl,
      popular: menuItemInfo.popular,
      spicy: menuItemInfo.spicy,
      requiredChoiceCategories: [],
      optionalChoices: [],
    };

    let optionalChoiceList = {};
    let reqCategoryList = {};
    let reqChoiceList = {};

    for (let i = 0; i < menuItem.length; i++) {
      let item = menuItem[i];
      if (item.optchoicename) {
        let optionalChoiceObj = {
          name: item.optchoicename,
          price: Number(item.optchoiceprice),
        };
        
        if (!optionalChoiceList[item.optchoicename]) {
          clientMenuItem.optionalChoices.push(optionalChoiceObj);
        }
        optionalChoiceList[item.optchoicename] = 1;
      }
      
      if (item.categoryname) {
        let requiredCategoryObj = {
          name: item.categoryname,
          choices: [],
        };

        for (let j = 0; j < menuItem.length; j++) {
          let innerItem = menuItem[j];
          let reqCategory = innerItem.categoryname;
          if (requiredCategoryObj.name === reqCategory) {
            let requiredChoiceObj = {
              name: innerItem.reqchoicename,
              price: Number(innerItem.reqchoiceprice),
            };
            if (!reqChoiceList[item.reqchoicename]) {
              requiredCategoryObj.choices.push(requiredChoiceObj);
            }
            reqChoiceList[item.reqchoicename] = 1;
          }
        }

        if (!reqCategoryList[item.categoryname]) {
          clientMenuItem.requiredChoiceCategories.push(requiredCategoryObj);
        }
        reqCategoryList[item.categoryname] = 1;
      }
    }

    res.status(200).send(clientMenuItem);
  } catch (err) {
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
