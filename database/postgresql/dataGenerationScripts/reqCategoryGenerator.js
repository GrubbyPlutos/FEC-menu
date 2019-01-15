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

////////////////////////////////////////////////////////
// GENERATES 33 MILLION
//   menu itemIds are randomized from 1 to 100 million
////////////////////////////////////////////////////////
const requiredCategoriesPrinter = () => {
  const fil = fs.createWriteStream('requiredCategories.csv');
  let categoryId = 1;
  const maxLimit = 33000000;

  const writer = () => {
    let result = true;

    while (categoryId <= maxLimit && result) {
      if (categoryId === 1) {
        fil.write('categoryId~categoryName~itemId\n')
      } 
      
      const data = dataFuncs.generateRequiredChoiceCategories(categoryId, (Math.floor(Math.random() * (100000000 - 1) + 1)));
      
      let stringToWrite = `${data.categoryId}~${data.categoryName}~${data.itemId}\n`;
      result = fil.write(stringToWrite);
      
      if (categoryId % 10000 === 0) {
        console.log(categoryId);
      }

      categoryId++;
    }

    if (categoryId < maxLimit) {
      fil.once('drain', writer);
    }
  }

  return writer;
}

const generateRequiredCategories = requiredCategoriesPrinter();
generateRequiredCategories();
