const faker = require('faker');

const pictures = ['https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

const randomFloat = range => range.min + Math.random() * (range.max - range.min);
const randomInt = range => Math.round(randomFloat(range));
const randomIndex = length => Math.floor(Math.random() * length);
const randomArray = (range, callback) => {
  const length = randomInt(range);
  return Array.from({ length }, (value, index, array) => callback(value, index, array));
};

const generateName = () => faker.random.words();
const generateMenuItemCategoriesArray = numCategories => (
  randomArray(numCategories, () => generateName())
);
const generateChoice = range => ({
  name: generateName(),
  price: randomFloat(range),
});
const generateChoicesArray = (numChoices, prices) => (
  randomArray(numChoices, () => generateChoice(prices))
);

// const generateRequiredChoiceCategories = (numCategories, numChoices, prices) => (
//   randomArray(numCategories, () => ({
//     name: generateName(),
//     choices: generateChoicesArray(numChoices, prices),
//   }))
// );

const generateRequiredChoiceCategories = (categoryId, numCategories, restaurantId, itemId) => (
  randomArray(numCategories, () => ({
    categoryId,
    categoryName: generateName(),
    restaurantId,
    itemId,
  }))
);

// const generateMenuItem = (restaurantId, itemId, category, params) => ({
//   restaurantId,
//   itemId,
//   category,
//   name: generateName(),
//   price: randomFloat(params.priceRange),
//   description: faker.lorem.paragraph(),
//   pictureUrl: pictures[faker.random.number(pictures.length - 1)],
//   popular: Math.random() < params.popularFraction,
//   spicy: Math.random() < params.spicyFraction,
//   requiredChoiceCategories: generateRequiredChoiceCategories(
//     params.numRequiredChoiceCategories,
//     params.numRequiredChoices,
//     params.priceRange,
//   ),
//   optionalChoices: generateChoicesArray(params.numOptionalChoices, params.priceRange),
// });

const generateMenuItem = (itemId, restaurantId, category, params) => ({
  itemId,
  restaurantId,
  category,
  name: generateName(),
  price: randomFloat(params.priceRange),
  description: faker.lorem.paragraph(),
  pictureUrl: pictures[faker.random.number(pictures.length - 1)],
  popular: Math.random() < params.popularFraction,
  spicy: Math.random() < params.spicyFraction,
});


const generateData = (params) => {
  const data = [];
  for (let restaurantId = 1; restaurantId <= 100; restaurantId += 1) {
    const itemCategories = generateMenuItemCategoriesArray(params.numItemCategories);
    const menuItems = randomArray(params.numMenuItems, (_, i) => {
      return generateMenuItem(
        restaurantId, i, itemCategories[randomIndex(itemCategories.length)], params,
      );
    });
    data.push(...menuItems);
  }
  return data;
};

module.exports = {
  generateMenuItem,
  generateMenuItemCategoriesArray,
  generateRequiredChoiceCategories,
  randomArray,
  randomIndex
};

// module.exports = generateData;
