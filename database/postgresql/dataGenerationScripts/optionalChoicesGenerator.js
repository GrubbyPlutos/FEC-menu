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
// GENERATES 100 MILLION
//   optional choices randomly dispersed amongst menu items
////////////////////////////////////////////////////////
const optionalChoicesPrinter = () => {
  const fil = fs.createWriteStream('optionalChoices.csv');
  let choiceId = 1;
  const maxLimit = 100000000;

  const writer = () => {
    let result = true;

    while (choiceId <= maxLimit && result) {
      const data = dataFuncs.generateOptionalChoice(choiceId, params.priceRange, (Math.floor(Math.random() * (100000000 - 1) + 1)));

      if (choiceId === 1) {
        fil.write('choiceId,name,price,itemId\n')
      } 

      let stringToWrite = `${data.choiceId},${data.name},${data.price},${data.itemId}\n`;
      result = fil.write(stringToWrite);
      
      if (choiceId % 10000 === 0) {
        console.log(choiceId);
      }
      
      choiceId++;
    }

    if (choiceId < maxLimit) {
      fil.once('drain', writer);
    }
  }

  return writer;
}

const generateOptionalChoices = optionalChoicesPrinter();
generateOptionalChoices();
