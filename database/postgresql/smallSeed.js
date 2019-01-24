const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/smallsdc';

const client = new Client(connectionString);
client.connect()
  .then(() => {
    console.log('querying menu items');
    return client.query(`COPY menu_items(itemId,restaurantId,category,name,price,description,pictureUrl,popular,spicy) FROM '/*FILL_ME_IN_PATHNAME*/' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('querying req categories');
    return client.query(`COPY required_categories(categoryId,categoryName,itemId) FROM '/*FILL_ME_IN_PATHNAME*/' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('querying req choices');
    return client.query(`COPY required_choices(reqChoiceId,reqChoiceName,reqChoicePrice,categoryId) FROM '/*FILL_ME_IN_PATHNAME*/' DELIMITER '~' CSV HEADER;`);
  })
  .then(() => {
    console.log('querying optional choices');
    return client.query(`COPY optional_choices(optChoiceId,optChoiceName,optChoicePrice,itemId) FROM '/*FILL_ME_IN_PATHNAME*/' DELIMITER '~' CSV HEADER;`);
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
