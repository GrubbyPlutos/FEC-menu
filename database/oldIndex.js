const mongoose = require('mongoose');
const generateData = require('./seed/dataGenerator');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://172.17.0.2/menu', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We\'re connected!');
});

const menuItemSchema = new mongoose.Schema({
  restaurantId: Number,
  itemId: Number,
  name: String,
  price: Number,
  description: String,
  category: String,
  pictureUrl: String,
  popular: Boolean,
  spicy: Boolean,
  requiredChoiceCategories: [{
    name: String,
    choices: [{
      name: String,
      price: Number,
    }],
  }],
  optionalChoices: [{
    name: String,
    price: Number,
  }],
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

const params = {
  numMenuItems: { max: 50, min: 10 },
  numItemCategories: { max: 3, min: 1 },
  numOptionalChoices: { max: 6, min: 0 },
  numRequiredChoiceCategories: { max: 2, min: 0 },
  numRequiredChoices: { max: 4, min: 2 },
  priceRange: { max: 20, min: 1 },
  popularFraction: 0.2,
  spicyFraction: 0.2,
};

const data = generateData(params);
MenuItem.insertMany(data, (err, menuItems) => {
  if (err) {
    return console.error(err);
  }

  console.log('Insertion successful!');
  console.log('First item of inserted data:');
  console.log(menuItems[0]);
});

const getAllMenuItems = restaurantId => (
  MenuItem.find({ restaurantId }).select('-requiredChoiceCategories -optionalChoices')
);
const getSingleMenuItem = (restaurantId, itemId) => MenuItem.findOne({ restaurantId, itemId });

module.exports = { getAllMenuItems, getSingleMenuItem, MenuItem, db };
