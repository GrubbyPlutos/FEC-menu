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
// GENERATES 132 MILLION
//   After 2 choices created for each required category
//     reqCategoryIds are randomized from 1 to 33 million
////////////////////////////////////////////////////////
const requiredChoicesPrinter = () => {
  const fil = fs.createWriteStream('requiredChoices.csv');
  let choiceId = 1;
  let categoryId = 1;
  const maxLimit = 132000000;

  const writer = () => {
    let result = true;

    while (choiceId <= maxLimit && result) {
      let data;
      
      if (choiceId === 1) {
        fil.write('reqChoiceId~reqChoiceName~reqChoicePrice~categoryId\n')
      } 

      if (choiceId > 66000000) {
        data = dataFuncs.generateChoice(choiceId, params.priceRange, (Math.floor(Math.random() * (33000000 - 1) + 1)));
      } else {
        data = dataFuncs.generateChoice(choiceId, params.priceRange, categoryId);
      }

      let stringToWrite = `${data.choiceId}~${data.name}~${data.price}~${data.categoryId}\n`;
      result = fil.write(stringToWrite);
      
      if (choiceId % 10000 === 0) {
        console.log(choiceId);
      }
      
      choiceId++;
      categoryId++;
      
      if (categoryId > 33000000) {
        categoryId = 1;
      }
    }

    if (choiceId < maxLimit) {
      fil.once('drain', writer);
    }
  }

  return writer;
}

const generateRequiredChoices = requiredChoicesPrinter();
generateRequiredChoices();
