// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  token: String,
  accountLookupId: String,
  createdAt: Date,
  updatedAt: Date
});

// the schema is useless so far
// we need to create a model using it
const tokenLookup = mongoose.model('tokenLookup', userSchema);

// make this available to our users in our Node applications
module.exports = tokenLookup;