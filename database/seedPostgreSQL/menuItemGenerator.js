// const faker = require('faker');
const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// const writer = csvWriter();

const dataFuncs = require('../seed/dataGenerator');

const params = {
  numMenuItems: { max: 10, min: 5 },
  numItemCategories: { max: 3, min: 1 },
  numOptionalChoices: { max: 3, min: 0 },
  numRequiredChoiceCategories: { max: 2, min: 0 },
  numRequiredChoices: { max: 3, min: 1 },
  priceRange: { max: 20, min: 1 },
  popularFraction: 0.2,
  spicyFraction: 0.2,
};

// writer.pipe(fs.createWriteStream('menuItems.csv'))

const menuItemsPrinter = () => {
  const fil = fs.createWriteStream('menuItems.csv');
  let itemId = 1;
  let restaurantId = 1;
  const maxLimit = 100000000;

  const writer = () => {
    let result = true;

    while (itemId <= maxLimit && result) {
      const itemCategories = dataFuncs.generateMenuItemCategoriesArray(params.numItemCategories);
      let data;
      // const data = dataFuncs.randomArray(params.numMenuItems, (_, i) => {
      //   return dataFuncs.generateMenuItem(
      //     itemId, i, itemCategories[dataFuncs.randomIndex(itemCategories.length)], params
      //   );
      // });
      if (itemId === 1) {
        fil.write('itemId,restaurantId,category,name,price,description,pictureUrl,popular,spicy\n')
      } 

      if (itemId > 30000000) {
        data = dataFuncs.generateMenuItem(
          itemId, (Math.floor(Math.random() * (10000000 - 1) + 1)), itemCategories[dataFuncs.randomIndex(itemCategories.length)], params
        );
      } else {
        data = dataFuncs.generateMenuItem(
          itemId, restaurantId, itemCategories[dataFuncs.randomIndex(itemCategories.length)], params
        );
      }

      // for (let x = 0; x < data.length; x++) {
      //   let obj = data[x];
      let stringToWrite = `${data.itemId},${data.restaurantId},${data.category},${data.name},${data.price},${data.description},${data.pictureUrl},${data.popular},${data.spicy}\n`;
      result = fil.write(stringToWrite);
      // }
      
      if (itemId % 10000 === 0) {
        console.log(itemId);
      }
      
      itemId++;
      restaurantId++;
      
      if (restaurantId > 10000000) {
        restaurantId = 1;
      }
    }

    if (itemId < maxLimit) {
      fil.once('drain', writer);
    }
  }

  return writer;
}

const generateMenuItems = menuItemsPrinter();
generateMenuItems();
