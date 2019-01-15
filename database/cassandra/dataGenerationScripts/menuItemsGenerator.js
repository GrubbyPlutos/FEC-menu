const fs = require('fs');

const dataFuncs = require('../../seed/dataGenerator');

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

const menuItemsPrinter = () => {
  const fil = fs.createWriteStream('menuItemsCassandra.csv');
  let itemId = 1;
  let restaurantId = 1;
  const maxLimit = 100000000;

  const writer = () => {
    let result = true;

    while (itemId <= maxLimit && result) {
      const itemCategories = dataFuncs.generateMenuItemCategoriesArray(params.numItemCategories);
      let data;

      if (itemId === 1) {
        fil.write('itemId~restaurantId~category~name~price~description~pictureUrl~popular~spicy~required~optional\n')
      } 

      if (itemId > 30000000) {
        data = dataFuncs.generateMenuItemCassandra(
          itemId, (Math.floor(Math.random() * (10000000 - 1) + 1)), itemCategories[dataFuncs.randomIndex(itemCategories.length)], params
        );
      } else {
        data = dataFuncs.generateMenuItemCassandra(
          itemId, restaurantId, itemCategories[dataFuncs.randomIndex(itemCategories.length)], params
        );
      }

      // for (let x = 0; x < data.length; x++) {
      //   let obj = data[x];
      let required = JSON.stringify(data.requiredChoiceCategories);
      let optional = JSON.stringify(data.optionalChoices);
      let stringToWrite = `${data.itemId}~${data.restaurantId}~${data.category}~${data.name}~${data.price}~${data.description}~${data.pictureUrl}~${data.popular}~${data.spicy}~${required}~${optional}\n`;
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
