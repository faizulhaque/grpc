// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  name: String,
  price: String
});

// the schema is useless so far
// we need to create a model using it
const Item = mongoose.model('item', userSchema);

// make this available to our users in our Node applications
module.exports = Item;