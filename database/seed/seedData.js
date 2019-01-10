const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
// const writer = csvWriter();

const dataFuncs = require('./dataGenerator');

const params = {
  numMenuItems: { max: 10, min: 5 },
  numItemCategories: { max: 3, min: 1 },
  numOptionalChoices: { max: 3, min: 0 },
  numRequiredChoiceCategories: { max: 2, min: 0 },
  numRequiredChoices: { max: 4, min: 2 },
  priceRange: { max: 20, min: 1 },
  popularFraction: 0.2,
  spicyFraction: 0.2,
};

// writer.pipe(fs.createWriteStream('menuItems.csv'))

const printer = () => {
  const fil = fs.createWriteStream('menuItems.csv');
  let count = 1;
  const maxLimit = 2;

  const writer = () => {
    let result = true;

    while (count < maxLimit && result) {
      const itemCategories = dataFuncs.generateMenuItemCategoriesArray(params.numItemCategories);
      const data = dataFuncs.randomArray(params.numMenuItems, (_, i) => {
        return dataFuncs.generateMenuItem(
          count, i, itemCategories[dataFuncs.randomIndex(itemCategories.length)], params
        );
      });

      for (let x = 0; x < data.length; x++) {
        let obj = data[x];
        let stringToWrite = `${obj.restaurantId},${obj.itemId},${obj.name},${obj.price},${obj.description},${obj.category},${obj.pictureUrl},${obj.popular},${obj.spicy},${obj.requiredChoiceCategories[0].name},${obj.requiredChoiceCategories[0].choices[0].name},${obj.requiredChoiceCategories[0].choices[0].price},${obj.optionalChoices[0].name},${obj.optionalChoices[0].price}\n`
        fil.write(stringToWrite);
      }
      
      if (count % 1000 === 0) {
        console.log(count);
      }

      count++;
    }

    if (count < maxLimit) {
      fil.once('drain', writer);
    }

  }

  return writer;
}

const seedRestaurants = printer();
seedRestaurants();
