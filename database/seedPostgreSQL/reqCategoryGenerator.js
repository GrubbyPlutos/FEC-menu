const fs = require('fs');

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

const requiredCategoriesPrinter = () => {
  const fil = fs.createWriteStream('requiredCategories.csv');
  let count = 1;
  const maxLimit = 100000;

  const writer = () => {
    let result = true;

    while (count <= maxLimit && result) {
      const data = dataFuncs.generateRequiredChoiceCategories(count, params.numRequiredChoiceCategories);

      if (count === 1) {
        fil.write('choiceId,requiredCategory,restaurantId,itemId\n')
      } 

      for (let x = 0; x < data.length; x++) {
        let obj = data[x];
        let stringToWrite = `\n`;
        // result = fil.write(stringToWrite);
      }
      
      if (count % 10000 === 0) {
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

const generateRequiredCategories = requiredCategoriesPrinter();
generateRequiredCategories();
