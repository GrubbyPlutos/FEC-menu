const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/smallsdc';

const client = new Client({
  host: '13.59.237.10',
  port: 5432,
  database: 'smallsdc',
  user: '/*FILL_ME_IN*/',
  password: '/*FILL_ME_IN*/',
});
client.connect()
  .then(() => {
    console.log('querying menu items');
    return client.query(`COPY menu_items(itemId,restaurantId,category,name,price,description,pictureUrl,popular,spicy) FROM '/home/ec2-user/smallMenuItems.csv' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('querying req categories');
    return client.query(`COPY required_categories(categoryId,categoryName,itemId) FROM '/home/ec2-user/smallRequiredCategories.csv' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('querying req choices');
    return client.query(`COPY required_choices(reqChoiceId,reqChoiceName,reqChoicePrice,categoryId) FROM '/home/ec2-user/smallRequiredChoices.csv' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('querying optional choices');
    return client.query(`COPY optional_choices(optChoiceId,optChoiceName,optChoicePrice,itemId) FROM '/home/ec2-user/smallOptionalChoices.csv' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('Success');
    client.end();
    process.exit();
  })
  .catch((err) => {
    console.log(err, 'Error');
    process.exit();
  })